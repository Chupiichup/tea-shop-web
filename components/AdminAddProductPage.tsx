import React, { useState, useEffect } from 'react';
import { ArrowLeft, Check, X, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from './Button';
import { db } from '../firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { CATEGORY_DETAILS } from '../constants';
import { useAuth } from '../context/AuthContext';
import { ADMIN_EMAILS } from '../constants/admin';

export const AdminAddProductPage: React.FC = () => {
  const { user, isLoading: authLoading } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    image: '',
    imageHover: '',
    images: [] as string[], // Array of additional images
    sku: '',
    ingredients: '',
    material: '',
    capacity: '',
    categoryIds: [] as string[],
    tag: '',
    format: '',
  });
  const [newImageUrl, setNewImageUrl] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  // Check authentication and admin access
  useEffect(() => {
    window.scrollTo(0, 0);
    
    if (!authLoading) {
      setIsCheckingAuth(false);
      
      // If not logged in, redirect to login
      if (!user) {
        alert('Vui lòng đăng nhập để truy cập trang quản trị.');
        window.location.hash = '#login';
        return;
      }
      
      // If logged in but not admin, show error and redirect
      if (!user.email || !ADMIN_EMAILS.includes(user.email)) {
        alert('Bạn không có quyền truy cập trang này.');
        window.location.hash = '#';
        return;
      }
    }
  }, [user, authLoading]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCategoryToggle = (categoryId: string) => {
    setFormData(prev => ({
      ...prev,
      categoryIds: prev.categoryIds.includes(categoryId)
        ? prev.categoryIds.filter(id => id !== categoryId)
        : [...prev.categoryIds, categoryId]
    }));
  };

  const handleAddImage = () => {
    if (newImageUrl.trim()) {
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, newImageUrl.trim()]
      }));
      setNewImageUrl('');
    }
  };

  const handleRemoveImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Double check admin access before submitting
    if (!user || !user.email || !ADMIN_EMAILS.includes(user.email)) {
      setSaveError('Bạn không có quyền thêm sản phẩm.');
      return;
    }
    
    setIsSaving(true);
    setSaveSuccess(false);
    setSaveError(null);

    try {
      // Format price
      const formattedPrice = formData.price.includes('₫')
        ? formData.price
        : `${parseInt(formData.price).toLocaleString('vi-VN')} ₫`;

      const productData: any = {
        name: formData.name,
        price: formattedPrice,
        image: formData.image,
        createdAt: Timestamp.fromDate(new Date()),
        updatedAt: Timestamp.fromDate(new Date()),
      };

      if (formData.description) productData.description = formData.description;
      if (formData.imageHover) productData.imageHover = formData.imageHover;
      // Combine main image and hover image with additional images
      const allImages = [formData.image];
      if (formData.imageHover) allImages.push(formData.imageHover);
      if (formData.images.length > 0) {
        allImages.push(...formData.images);
      }
      if (allImages.length > 1) {
        productData.images = allImages;
      }
      if (formData.sku) productData.sku = formData.sku;
      if (formData.ingredients) productData.ingredients = formData.ingredients;
      if (formData.material) productData.material = formData.material;
      if (formData.capacity) productData.capacity = formData.capacity;
      if (formData.categoryIds.length > 0) productData.categoryIds = formData.categoryIds;
      if (formData.tag) productData.tag = formData.tag;
      if (formData.format) productData.format = formData.format;

      await addDoc(collection(db, 'products'), productData);
      
      setSaveSuccess(true);
      setSaveError(null);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setFormData({
          name: '',
          price: '',
          description: '',
          image: '',
          imageHover: '',
          images: [],
          sku: '',
          ingredients: '',
          material: '',
          capacity: '',
          categoryIds: [],
          tag: '',
          format: '',
        });
        setNewImageUrl('');
        setSaveSuccess(false);
      }, 3000);
    } catch (error: any) {
      console.error('Lỗi khi lưu sản phẩm:', error);
      const errorMessage = error?.message || 'Đã xảy ra lỗi khi lưu sản phẩm. Vui lòng thử lại.';
      setSaveError(errorMessage);
      setSaveSuccess(false);
    } finally {
      setIsSaving(false);
    }
  };

  const inputClass = "w-full px-4 py-3 rounded-lg border border-stone-300 focus:border-stone-900 focus:ring-1 focus:ring-stone-900 outline-none transition-all placeholder:font-light bg-white text-stone-900";
  const labelClass = "block text-sm font-bold text-stone-800 mb-2";

  // Group categories by parent for better organization
  const groupedCategories = (() => {
    const groups: Record<string, { id: string; label: string; parent?: string }[]> = {};
    const mainCategories: { id: string; label: string }[] = [];

    Object.entries(CATEGORY_DETAILS).forEach(([id, detail]) => {
      if (detail.parent) {
        const parentId = detail.parent.href.replace('#', '');
        if (!groups[parentId]) {
          groups[parentId] = [];
        }
        groups[parentId].push({ id, label: detail.title, parent: parentId });
      } else {
        mainCategories.push({ id, label: detail.title });
      }
    });

    return { mainCategories, groups };
  })();

  // Show loading state while checking authentication
  if (isCheckingAuth || authLoading) {
    return (
      <div className="bg-stone-50 min-h-screen pt-[80px] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-rust-500 animate-spin mx-auto mb-4" />
          <p className="text-stone-600">Đang kiểm tra quyền truy cập...</p>
        </div>
      </div>
    );
  }

  // If not authenticated or not admin, don't render (redirect will happen)
  if (!user || !user.email || !ADMIN_EMAILS.includes(user.email)) {
    return null;
  }

  return (
    <div className="bg-stone-50 min-h-screen pt-[80px]">
      {/* Header Banner */}
      <div className="bg-stone-950 py-12">
        <div className="container mx-auto px-6 lg:px-12">
          <a href="#" className="inline-flex items-center gap-2 text-stone-400 hover:text-white mb-6 text-sm font-bold transition-colors">
            <ArrowLeft size={16} /> Về trang chủ
          </a>
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            Thêm sản phẩm mới
          </h1>
          <p className="text-stone-400 font-light mt-2">Quản lý sản phẩm của cửa hàng</p>
          <p className="text-stone-500 text-sm mt-1">Đăng nhập với tư cách: {user.email}</p>
        </div>
      </div>

      <div className="container mx-auto px-6 lg:px-12 py-12 max-w-3xl">
        <div className="bg-white rounded-lg shadow-sm p-8">
          {/* Success Message */}
          {saveSuccess && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3 animate-fade-in">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <Check size={20} className="text-white" />
              </div>
              <div className="flex-1">
                <p className="font-bold text-green-800 mb-1">Sản phẩm đã được thêm thành công!</p>
                <p className="text-sm text-green-600">Sản phẩm đã được lưu vào Firestore và sẽ hiển thị trên website.</p>
              </div>
              <button
                onClick={() => setSaveSuccess(false)}
                className="text-green-600 hover:text-green-800 transition-colors"
              >
                <X size={18} />
              </button>
            </div>
          )}

          {/* Error Message */}
          {saveError && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3 animate-fade-in">
              <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <AlertCircle size={20} className="text-white" />
              </div>
              <div className="flex-1">
                <p className="font-bold text-red-800 mb-1">Lỗi khi lưu sản phẩm</p>
                <p className="text-sm text-red-600">{saveError}</p>
                <p className="text-xs text-red-500 mt-2">Vui lòng kiểm tra lại thông tin và thử lại.</p>
              </div>
              <button
                onClick={() => setSaveError(null)}
                className="text-red-600 hover:text-red-800 transition-colors"
              >
                <X size={18} />
              </button>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Product Name */}
            <div>
              <label htmlFor="name" className={labelClass}>
                Tên sản phẩm <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Nhập tên sản phẩm"
                className={inputClass}
              />
            </div>

            {/* Price */}
            <div>
              <label htmlFor="price" className={labelClass}>
                Giá <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="price"
                name="price"
                required
                value={formData.price}
                onChange={handleChange}
                placeholder="Ví dụ: 125000 hoặc 125.000 ₫"
                className={inputClass}
              />
              <p className="text-xs text-stone-500 mt-1">Nhập số (sẽ tự động format thành 125.000 ₫)</p>
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className={labelClass}>Mô tả</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Nhập mô tả sản phẩm"
                rows={4}
                className={inputClass}
              />
            </div>

            {/* Image Link */}
            <div>
              <label htmlFor="image" className={labelClass}>
                Link ảnh sản phẩm <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="image"
                name="image"
                required
                value={formData.image}
                onChange={handleChange}
                placeholder="/images/tra-moc-bg.png hoặc URL đầy đủ"
                className={inputClass}
              />
              <p className="text-xs text-stone-500 mt-1">
                Để dùng ảnh trong folder public/images, nhập: /images/tên-file.png
              </p>
              {formData.image && (
                <div className="mt-3">
                  <img
                    src={formData.image}
                    alt="Preview"
                    className="w-32 h-32 object-cover rounded-lg border border-stone-200"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                </div>
              )}
            </div>

            {/* Hover Image Link (Optional) */}
            <div>
              <label htmlFor="imageHover" className={labelClass}>
                Link ảnh hover (tùy chọn)
              </label>
              <input
                type="text"
                id="imageHover"
                name="imageHover"
                value={formData.imageHover}
                onChange={handleChange}
                placeholder="/images/tra-moc-hover.png hoặc URL đầy đủ"
                className={inputClass}
              />
              <p className="text-xs text-stone-500 mt-1">
                Ảnh này sẽ hiển thị khi người dùng hover vào sản phẩm. Nếu không có, sẽ dùng ảnh chính.
              </p>
              {formData.imageHover && (
                <div className="mt-3">
                  <img
                    src={formData.imageHover}
                    alt="Hover Preview"
                    className="w-32 h-32 object-cover rounded-lg border border-stone-200"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                </div>
              )}
            </div>

            {/* Additional Images (for gallery) */}
            <div>
              <label className={labelClass}>Thêm ảnh khác (cho gallery)</label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                  placeholder="/images/tra-moc-2.png"
                  className={inputClass}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddImage();
                    }
                  }}
                />
                <Button
                  type="button"
                  onClick={handleAddImage}
                  className="bg-stone-700 hover:bg-stone-600 text-white px-4"
                >
                  Thêm
                </Button>
              </div>
              {formData.images.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.images.map((img, index) => (
                    <div key={index} className="relative">
                      <img
                        src={img}
                        alt={`Gallery ${index + 1}`}
                        className="w-20 h-20 object-cover rounded-lg border border-stone-200"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
              <p className="text-xs text-stone-500 mt-1">
                Thêm nhiều ảnh để tạo gallery trên trang chi tiết sản phẩm. Nhấn Enter hoặc nút "Thêm" để thêm ảnh.
              </p>
            </div>

            {/* SKU */}
            <div>
              <label htmlFor="sku" className={labelClass}>Mã sản phẩm (SKU)</label>
              <input
                type="text"
                id="sku"
                name="sku"
                value={formData.sku}
                onChange={handleChange}
                placeholder="VD: T125AE018"
                className={inputClass}
              />
            </div>

            {/* Ingredients (for tea products) */}
            <div>
              <label htmlFor="ingredients" className={labelClass}>Thành phần (cho sản phẩm trà)</label>
              <textarea
                id="ingredients"
                name="ingredients"
                value={formData.ingredients}
                onChange={handleChange}
                placeholder="VD: Trà đen, hoa sen, hoa cúc..."
                rows={2}
                className={inputClass}
              />
            </div>

            {/* Material (for teaware products) */}
            <div>
              <label htmlFor="material" className={labelClass}>Chất liệu & Bảo quản (cho trà cụ)</label>
              <textarea
                id="material"
                name="material"
                value={formData.material}
                onChange={handleChange}
                placeholder="VD: Gốm sứ. An toàn với lò vi sóng và máy rửa bát."
                rows={2}
                className={inputClass}
              />
            </div>

            {/* Capacity (for teaware products) */}
            <div>
              <label htmlFor="capacity" className={labelClass}>Dung tích (cho trà cụ)</label>
              <input
                type="text"
                id="capacity"
                name="capacity"
                value={formData.capacity}
                onChange={handleChange}
                placeholder="VD: 750ml"
                className={inputClass}
              />
            </div>

            {/* Categories - Multi-select with checkboxes */}
            <div>
              <label className={labelClass}>Danh mục (có thể chọn nhiều)</label>
              <div className="border border-stone-300 rounded-lg p-4 max-h-64 overflow-y-auto bg-white">
                {/* Main Categories */}
                {groupedCategories.mainCategories.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-xs font-bold text-stone-500 uppercase tracking-widest mb-3">Danh mục chính</h4>
                    <div className="space-y-2">
                      {groupedCategories.mainCategories.map(cat => (
                        <label key={cat.id} className="flex items-center gap-3 cursor-pointer group">
                          <input
                            type="checkbox"
                            checked={formData.categoryIds.includes(cat.id)}
                            onChange={() => handleCategoryToggle(cat.id)}
                            className="w-4 h-4 rounded border-stone-300 text-rust-500 focus:ring-rust-500 cursor-pointer"
                          />
                          <span className="text-stone-700 text-sm group-hover:text-rust-600 transition-colors">{cat.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {/* Sub-categories grouped by parent */}
                {Object.entries(groupedCategories.groups).map(([parentId, subCats]) => {
                  const parentLabel = CATEGORY_DETAILS[parentId]?.title || parentId;
                  return (
                    <div key={parentId} className="mb-4 last:mb-0">
                      <h4 className="text-xs font-bold text-stone-500 uppercase tracking-widest mb-3">{parentLabel}</h4>
                      <div className="space-y-2 pl-4">
                        {subCats.map(cat => (
                          <label key={cat.id} className="flex items-center gap-3 cursor-pointer group">
                            <input
                              type="checkbox"
                              checked={formData.categoryIds.includes(cat.id)}
                              onChange={() => handleCategoryToggle(cat.id)}
                              className="w-4 h-4 rounded border-stone-300 text-rust-500 focus:ring-rust-500 cursor-pointer"
                            />
                            <span className="text-stone-700 text-sm group-hover:text-rust-600 transition-colors">{cat.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
              <p className="text-xs text-stone-500 mt-2">
                Chọn một hoặc nhiều danh mục. Sản phẩm sẽ hiển thị ở tất cả các trang danh mục đã chọn.
              </p>
            </div>

            {/* Tag */}
            <div>
              <label htmlFor="tag" className={labelClass}>Tag</label>
              <select
                id="tag"
                name="tag"
                value={formData.tag}
                onChange={handleChange}
                className={inputClass}
              >
                <option value="">Chọn tag (tùy chọn)</option>
                <option value="Mới">Mới</option>
                <option value="Bán chạy">Bán chạy</option>
                <option value="Cao cấp">Cao cấp</option>
                <option value="Tiện lợi">Tiện lợi</option>
                <option value="Thượng hạng">Thượng hạng</option>
                <option value="Đặc sản">Đặc sản</option>
                <option value="VIP">VIP</option>
                <option value="Lâu năm">Lâu năm</option>
              </select>
            </div>

            {/* Format */}
            <div>
              <label htmlFor="format" className={labelClass}>Format</label>
              <select
                id="format"
                name="format"
                value={formData.format}
                onChange={handleChange}
                className={inputClass}
              >
                <option value="">Chọn format (tùy chọn)</option>
                <option value="Lá rời">Lá rời</option>
                <option value="Túi lọc">Túi lọc</option>
                <option value="Bánh">Bánh</option>
              </select>
            </div>

            {/* Submit Button */}
            <div className="pt-6 border-t border-stone-200">
              <Button
                type="submit"
                disabled={isSaving}
                fullWidth
                className="bg-stone-900 hover:bg-stone-800 text-white font-bold py-4 text-base rounded-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Đang lưu sản phẩm...</span>
                  </>
                ) : (
                  'Lưu sản phẩm'
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

