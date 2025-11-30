import React, { useState, useEffect, useMemo } from 'react';
import { ArrowLeft, ChevronDown, ChevronUp, Minus, Plus, ShoppingBag, Star, Check, Zap, Sun, Leaf, Clock, Thermometer } from 'lucide-react';
import { Button } from './Button';
import { Product } from '../types';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { ALL_PRODUCTS, CATEGORY_DETAILS } from '../constants';
import { useCart } from '../context/CartContext';

interface ProductDetailPageProps {
  productId: string;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ productId }) => {
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedFormat, setSelectedFormat] = useState<string>('Lá rời');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedVariant, setSelectedVariant] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    description: true,
    ingredients: false,
    brewingGuide: false,
    delivery: false,
  });

  // Determine product type (tea vs teaware)
  const isTeaProduct = useMemo(() => {
    if (!product) return false;
    const categoryIds = product.categoryIds || (product.categoryId ? [product.categoryId] : []);
    const teaCategories = ['tra-nguyen-ban', 'tra-uop-huong', 'luc-tra', 'bach-tra', 'hoang-tra', 'o-long', 'pho-nhi', 'hong-tra', 'tra-sen', 'tra-lai', 'tra-que'];
    return categoryIds.some(id => teaCategories.includes(id));
  }, [product]);

  const isTeawareProduct = useMemo(() => {
    if (!product) return false;
    const categoryIds = product.categoryIds || (product.categoryId ? [product.categoryId] : []);
    const teawareCategories = ['tra-cu', 'bo-tra', 'am-tra', 'chen-tra', 'chen-tong', 'tra-cu-khac'];
    return categoryIds.some(id => teawareCategories.includes(id));
  }, [product]);

  // Get product images array
  const productImages = useMemo(() => {
    if (!product) return [];
    if (product.images && product.images.length > 0) {
      return product.images;
    }
    // Fallback: use main image and hover image
    const images = [product.image];
    if (product.imageHover) {
      images.push(product.imageHover);
    }
    return images;
  }, [product]);

  // Get current price based on selected size/variant
  const currentPrice = useMemo(() => {
    if (!product) return '';
    if (isTeaProduct && selectedSize && product.sizes) {
      const size = product.sizes.find(s => s.id === selectedSize);
      return size?.price || product.price;
    }
    if (isTeawareProduct && selectedVariant && product.variants) {
      const variant = product.variants.find(v => v.id === selectedVariant);
      return variant?.price || product.price;
    }
    return product.price;
  }, [product, selectedSize, selectedVariant, isTeaProduct, isTeawareProduct]);

  // Fetch product data
  useEffect(() => {
    const loadProduct = async () => {
      setIsLoading(true);
      try {
        // First, check in ALL_PRODUCTS (local constants)
        let foundProduct = ALL_PRODUCTS.find(p => p.id === productId);
        
        if (!foundProduct) {
          // If not found, fetch from Firestore
          const productRef = doc(db, 'products', productId);
          const productSnap = await getDoc(productRef);
          
          if (productSnap.exists()) {
            const data = productSnap.data();
            foundProduct = {
              id: productSnap.id,
              name: data.name || '',
              price: data.price || '',
              image: data.image || '',
              imageHover: data.imageHover,
              images: data.images,
              tag: data.tag,
              format: data.format,
              categoryIds: data.categoryIds || (data.categoryId ? [data.categoryId] : []),
              categoryId: data.categoryId,
              sku: data.sku,
              sizes: data.sizes,
              variants: data.variants,
              ingredients: data.ingredients,
              brewingGuide: data.brewingGuide,
              material: data.material,
              capacity: data.capacity,
              reviews: data.reviews,
              description: data.description,
            } as Product;
          }
        }

        if (foundProduct) {
          setProduct(foundProduct);
          // Set default size/variant
          if (foundProduct.sizes && foundProduct.sizes.length > 0) {
            setSelectedSize(foundProduct.sizes[0].id);
          }
          if (foundProduct.variants && foundProduct.variants.length > 0) {
            setSelectedVariant(foundProduct.variants[0].id);
          }
        } else {
          // Product not found
          setProduct(null);
        }
      } catch (error) {
        console.error('Error loading product:', error);
        setProduct(null);
      } finally {
        setIsLoading(false);
      }
    };

    loadProduct();
  }, [productId]);

  // Get breadcrumb info
  const breadcrumbInfo = useMemo(() => {
    if (!product) return null;
    const categoryIds = product.categoryIds || (product.categoryId ? [product.categoryId] : []);
    if (categoryIds.length > 0) {
      const firstCategory = CATEGORY_DETAILS[categoryIds[0]];
      if (firstCategory) {
        return {
          category: firstCategory.title,
          categoryHref: `#${categoryIds[0]}`,
          parent: firstCategory.parent,
        };
      }
    }
    return null;
  }, [product]);

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const handleAddToCart = () => {
    if (!product) return;
    
    // Create product with selected options
    const productToAdd: Product = {
      ...product,
      price: currentPrice,
      // Include size/variant info in name if needed
      name: selectedSize && product.sizes 
        ? `${product.name} - ${product.sizes.find(s => s.id === selectedSize)?.name || ''}`
        : selectedVariant && product.variants
        ? `${product.name} - ${product.variants.find(v => v.id === selectedVariant)?.name || ''}`
        : product.name,
    };

    // Add multiple quantities
    for (let i = 0; i < quantity; i++) {
      addToCart(productToAdd);
    }
  };

  const handleQuantityChange = (delta: number) => {
    setQuantity(prev => Math.max(1, prev + delta));
  };

  // Keyboard navigation for images
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (productImages.length <= 1) return;
      if (e.key === 'ArrowLeft') {
        setSelectedImageIndex(prev => (prev > 0 ? prev - 1 : productImages.length - 1));
      } else if (e.key === 'ArrowRight') {
        setSelectedImageIndex(prev => (prev < productImages.length - 1 ? prev + 1 : 0));
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [productImages.length]);

  if (isLoading) {
    return (
      <div className="bg-white min-h-screen pt-[80px] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-rust-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-stone-600">Đang tải sản phẩm...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="bg-white min-h-screen pt-[80px]">
        <div className="container mx-auto px-6 lg:px-12 py-20 text-center">
          <h1 className="text-3xl font-bold text-stone-900 mb-4">Sản phẩm không tồn tại</h1>
          <p className="text-stone-600 mb-8">Không tìm thấy sản phẩm với ID: {productId}</p>
          <Button onClick={() => window.location.hash = '#'}>Về trang chủ</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen pt-[80px]">
      {/* Breadcrumb */}
      <div className="container mx-auto px-6 lg:px-12 py-6">
        <nav className="flex items-center text-xs md:text-sm text-stone-500 mb-6">
          <a href="#" onClick={(e) => { e.preventDefault(); window.location.hash = '#'; }} className="hover:text-rust-500 transition-colors">
            Trang Chủ
          </a>
          {breadcrumbInfo && (
            <>
              <span className="mx-2">/</span>
              {breadcrumbInfo.parent && (
                <>
                  <a 
                    href={breadcrumbInfo.parent.href} 
                    onClick={(e) => { e.preventDefault(); window.location.hash = breadcrumbInfo.parent!.href; }}
                    className="hover:text-rust-500 transition-colors"
                  >
                    {breadcrumbInfo.parent.label}
                  </a>
                  <span className="mx-2">/</span>
                </>
              )}
              <a 
                href={breadcrumbInfo.categoryHref}
                onClick={(e) => { e.preventDefault(); window.location.hash = breadcrumbInfo.categoryHref; }}
                className="hover:text-rust-500 transition-colors"
              >
                {breadcrumbInfo.category}
              </a>
            </>
          )}
          <span className="mx-2">/</span>
          <span className="text-stone-900 font-medium">{product.name}</span>
        </nav>
      </div>

      <div className="container mx-auto px-6 lg:px-12 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* LEFT SIDE: Image Gallery */}
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Thumbnail Gallery */}
            {productImages.length > 1 && (
              <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-y-auto lg:max-h-[600px] pb-2 lg:pb-0">
                {productImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 lg:w-24 lg:h-24 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImageIndex === index
                        ? 'border-rust-500 shadow-md'
                        : 'border-stone-200 hover:border-stone-400'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} - View ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Main Image */}
            <div className="flex-1 relative aspect-square bg-stone-50 rounded-xl overflow-hidden">
              <img
                src={productImages[selectedImageIndex] || product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.tag && (
                <div className="absolute top-4 left-4 bg-rust-500 text-white text-xs font-bold uppercase px-3 py-1.5 rounded-full tracking-wider shadow-lg z-10">
                  {product.tag}
                </div>
              )}
            </div>
          </div>

          {/* RIGHT SIDE: Product Info */}
          <div className="space-y-6">
            {/* Title & Format */}
            <div>
              <div className="flex items-center gap-3 mb-2">
                {product.format && (
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-stone-600 uppercase tracking-widest border border-stone-300 rounded px-2 py-1">
                    <Leaf size={12} />
                    {product.format}
                  </span>
                )}
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-stone-900 mb-2">{product.name}</h1>
              {product.sku && (
                <p className="text-sm text-stone-500">Mã sản phẩm: {product.sku}</p>
              )}
            </div>


            {/* Short Description */}
            {product.description && (
              <p className="text-stone-600 leading-relaxed">
                {product.description.split('.')[0] + '.'}
              </p>
            )}

            {/* TEA PRODUCT LAYOUT */}
            {isTeaProduct && (
              <>
                {/* Choose Format */}
                <div>
                  <label className="block text-sm font-bold text-stone-800 mb-3">Chọn quy cách</label>
                  <div className="flex gap-3">
                    {['Lá rời', 'Túi lọc'].map((format) => (
                      <button
                        key={format}
                        onClick={() => setSelectedFormat(format)}
                        className={`flex-1 px-6 py-3 rounded-lg border-2 transition-all ${
                          selectedFormat === format
                            ? 'border-rust-500 bg-rust-50 text-rust-700 font-bold'
                            : 'border-stone-300 text-stone-700 hover:border-stone-400'
                        }`}
                      >
                        {selectedFormat === format && <Check size={16} className="inline mr-2" />}
                        {format}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Choose Size */}
                {product.sizes && product.sizes.length > 0 && (
                  <div>
                    <label className="block text-sm font-bold text-stone-800 mb-3">Chọn kích thước</label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {product.sizes.map((size) => (
                        <button
                          key={size.id}
                          onClick={() => setSelectedSize(size.id)}
                          className={`relative p-4 rounded-lg border-2 transition-all text-left ${
                            selectedSize === size.id
                              ? 'border-rust-500 bg-rust-50'
                              : 'border-stone-200 hover:border-stone-400'
                          }`}
                        >
                          {selectedSize === size.id && (
                            <div className="absolute top-2 right-2">
                              <Check size={20} className="text-rust-500" />
                            </div>
                          )}
                          {size.image && (
                            <img src={size.image} alt={size.name} className="w-16 h-16 object-cover rounded mb-2" />
                          )}
                          <div className="font-bold text-stone-900 text-sm">{size.name}</div>
                          <div className="text-xs text-stone-500 mb-1">{size.weight}</div>
                          <div className="text-stone-900 font-bold">{size.price}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}

            {/* TEAWARE PRODUCT LAYOUT */}
            {isTeawareProduct && (
              <>
                {/* Also Available In (Variants) */}
                {product.variants && product.variants.length > 0 && (
                  <div>
                    <label className="block text-sm font-bold text-stone-800 mb-3">Cũng có sẵn với</label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {product.variants.map((variant) => (
                        <button
                          key={variant.id}
                          onClick={() => setSelectedVariant(variant.id)}
                          className={`relative p-4 rounded-lg border-2 transition-all text-left ${
                            selectedVariant === variant.id
                              ? 'border-rust-500 bg-rust-50'
                              : 'border-stone-200 hover:border-stone-400'
                          }`}
                        >
                          {selectedVariant === variant.id && (
                            <div className="absolute top-2 right-2">
                              <Check size={20} className="text-rust-500" />
                            </div>
                          )}
                          {variant.image && (
                            <img src={variant.image} alt={variant.name} className="w-16 h-16 object-cover rounded mb-2" />
                          )}
                          <div className="font-bold text-stone-900 text-sm">{variant.name}</div>
                          {variant.color && (
                            <div className="text-xs text-stone-500 mb-1">{variant.color}</div>
                          )}
                          <div className="text-stone-900 font-bold">{variant.price}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}

            {/* Promotion Banner */}
            {product.tag && (
              <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                <div className="flex items-center gap-2">
                  <span className="text-orange-800 font-bold">Giảm giá đặc biệt!</span>
                  <span className="text-sm text-orange-600">Áp dụng cho sản phẩm này</span>
                </div>
              </div>
            )}

            {/* Quantity Selector */}
            <div>
              <label className="block text-sm font-bold text-stone-800 mb-2">Số lượng</label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  className="w-10 h-10 rounded-lg border border-stone-300 flex items-center justify-center hover:bg-stone-50 transition-colors"
                >
                  <Minus size={18} />
                </button>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-20 text-center text-lg font-bold border-0 focus:outline-none"
                />
                <button
                  onClick={() => handleQuantityChange(1)}
                  className="w-10 h-10 rounded-lg border border-stone-300 flex items-center justify-center hover:bg-stone-50 transition-colors"
                >
                  <Plus size={18} />
                </button>
              </div>
            </div>

            {/* Price & Add to Cart */}
            <div className="flex gap-4">
              <div className="flex-1 bg-stone-900 text-white px-6 py-4 rounded-lg text-center">
                <div className="text-2xl font-bold">{currentPrice}</div>
              </div>
              <Button
                onClick={handleAddToCart}
                className="flex-1 bg-rust-500 hover:bg-rust-600 text-white font-bold py-4 text-lg rounded-lg flex items-center justify-center gap-2"
              >
                <ShoppingBag size={20} />
                Thêm vào giỏ
              </Button>
            </div>

            {/* Features */}
            <div className="flex flex-wrap gap-4 pt-4 border-t border-stone-200">
              {isTeaProduct && (
                <>
                  <div className="flex items-center gap-2 text-stone-600">
                    <Leaf size={16} />
                    <span className="text-sm">Trà đen</span>
                  </div>
                  <div className="flex items-center gap-2 text-stone-600">
                    <Zap size={16} />
                    <span className="text-sm">Năng lượng</span>
                  </div>
                  <div className="flex items-center gap-2 text-stone-600">
                    <Sun size={16} />
                    <span className="text-sm">Buổi chiều</span>
                  </div>
                </>
              )}
            </div>

            {/* Collapsible Sections */}
            <div className="space-y-2 pt-4 border-t border-stone-200">
              {/* Description */}
              <div>
                <button
                  onClick={() => toggleSection('description')}
                  className="w-full flex items-center justify-between py-4 text-left font-bold text-stone-900 hover:text-rust-600 transition-colors"
                >
                  <span>Mô tả</span>
                  {expandedSections.description ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                {expandedSections.description && product.description && (
                  <div className="pb-4 text-stone-600 leading-relaxed whitespace-pre-line">
                    {product.description}
                  </div>
                )}
              </div>

              {/* Ingredients (for tea) */}
              {isTeaProduct && product.ingredients && (
                <div>
                  <button
                    onClick={() => toggleSection('ingredients')}
                    className="w-full flex items-center justify-between py-4 text-left font-bold text-stone-900 hover:text-rust-600 transition-colors"
                  >
                    <span>Thành phần</span>
                    {expandedSections.ingredients ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>
                  {expandedSections.ingredients && (
                    <div className="pb-4 text-stone-600">
                      {product.ingredients}
                    </div>
                  )}
                </div>
              )}

              {/* Brewing Guide (for tea) */}
              {isTeaProduct && product.brewingGuide && (
                <div>
                  <button
                    onClick={() => toggleSection('brewingGuide')}
                    className="w-full flex items-center justify-between py-4 text-left font-bold text-stone-900 hover:text-rust-600 transition-colors"
                  >
                    <span>Hướng dẫn pha</span>
                    {expandedSections.brewingGuide ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>
                  {expandedSections.brewingGuide && (
                    <div className="pb-4 space-y-4">
                      <div className="flex items-center gap-6 text-stone-600">
                        <div className="flex items-center gap-2">
                          <Leaf size={18} />
                          <span>{product.brewingGuide.quantity}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Thermometer size={18} />
                          <span>{product.brewingGuide.temperature}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock size={18} />
                          <span>{product.brewingGuide.time}</span>
                        </div>
                      </div>
                      {product.brewingGuide.hot && (
                        <div className="text-stone-600 text-sm">
                          <strong>Pha nóng:</strong> {product.brewingGuide.hot}
                        </div>
                      )}
                      {product.brewingGuide.iced && (
                        <div className="text-stone-600 text-sm">
                          <strong>Pha lạnh:</strong> {product.brewingGuide.iced}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Material & Care (for teaware) */}
              {isTeawareProduct && product.material && (
                <div>
                  <button
                    onClick={() => toggleSection('material')}
                    className="w-full flex items-center justify-between py-4 text-left font-bold text-stone-900 hover:text-rust-600 transition-colors"
                  >
                    <span>Chất liệu & Bảo quản</span>
                    {expandedSections.material ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>
                  {expandedSections.material && (
                    <div className="pb-4 text-stone-600">
                      {product.material}
                    </div>
                  )}
                </div>
              )}

              {/* Capacity (for teaware) */}
              {isTeawareProduct && product.capacity && (
                <div>
                  <button
                    onClick={() => toggleSection('capacity')}
                    className="w-full flex items-center justify-between py-4 text-left font-bold text-stone-900 hover:text-rust-600 transition-colors"
                  >
                    <span>Dung tích</span>
                    {expandedSections.capacity ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>
                  {expandedSections.capacity && (
                    <div className="pb-4 text-stone-600">
                      {product.capacity}
                    </div>
                  )}
                </div>
              )}

              {/* Delivery & Returns */}
              <div>
                <button
                  onClick={() => toggleSection('delivery')}
                  className="w-full flex items-center justify-between py-4 text-left font-bold text-stone-900 hover:text-rust-600 transition-colors"
                >
                  <span>Giao hàng & Đổi trả</span>
                  {expandedSections.delivery ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                {expandedSections.delivery && (
                  <div className="pb-4 text-stone-600 space-y-4 text-sm">
                    <div>
                      <strong>Giao hàng tiêu chuẩn:</strong> Đơn hàng thường đến trong 3-5 ngày làm việc. Miễn phí với đơn hàng trên 500.000 ₫.
                    </div>
                    <div>
                      <strong>Giao hàng nhanh:</strong> Nhận hàng trong 1-3 ngày làm việc.
                    </div>
                    <div>
                      <strong>Chính sách đổi trả:</strong> Chúng tôi muốn đảm bảo bạn hoàn toàn hài lòng với sản phẩm trà của mình. Tìm hiểu thêm về chính sách đổi trả của chúng tôi.
                    </div>
                  </div>
                )}
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

