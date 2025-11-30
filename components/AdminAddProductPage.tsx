import React, { useState, useEffect } from 'react';
import { ArrowLeft, Check } from 'lucide-react';
import { Button } from './Button';
import { db } from '../firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { CATEGORIES } from '../constants';
import { MAIN_CATEGORIES, SUB_CATEGORIES, TEA_FORMATS, TEA_ORIGINS, FLAVOR_CATEGORIES, ALL_FLAVORS } from '../constants/filterOptions';

export const AdminAddProductPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    image: '',
    mainCategory: '',
    categoryId: '',
    tag: '',
    format: '',
    origin: '',
    flavors: [] as string[],
  });
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => {
      // Khi đổi mainCategory, reset categoryId
      if (name === 'mainCategory') {
        return { ...prev, [name]: value, categoryId: '' };
      }
      return { ...prev, [name]: value };
    });
  };

  const handleFlavorChange = (flavor: string) => {
    setFormData(prev => {
      const flavors = prev.flavors.includes(flavor)
        ? prev.flavors.filter(f => f !== flavor)
        : [...prev.flavors, flavor];
      return { ...prev, flavors };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveSuccess(false);

    try {
      // Format price với đơn vị VND
      const formattedPrice = formData.price.includes('₫') 
        ? formData.price 
        : `${parseInt(formData.price).toLocaleString('vi-VN')} ₫`;

      // Tạo product data
      const productData: any = {
        name: formData.name,
        price: formattedPrice,
        image: formData.image,
        createdAt: Timestamp.fromDate(new Date()),
        updatedAt: Timestamp.fromDate(new Date()),
      };

      // Thêm các trường optional nếu có
      if (formData.description) {
        productData.description = formData.description;
      }
      if (formData.mainCategory) {
        productData.mainCategory = formData.mainCategory;
      }
      if (formData.categoryId) {
        productData.categoryId = formData.categoryId;
      }
      if (formData.tag) {
        productData.tag = formData.tag;
      }
      if (formData.format) {
        productData.format = formData.format;
      }
      if (formData.origin) {
        productData.origin = formData.origin;
      }
      if (formData.flavors.length > 0) {
        productData.flavors = formData.flavors;
      }

      // Lưu vào Firestore
      await addDoc(collection(db, 'products'), productData);

      // Thông báo thành công
      setSaveSuccess(true);
      
      // Reset form sau 2 giây
      setTimeout(() => {
        setFormData({
          name: '',
          price: '',
          description: '',
          image: '',
          mainCategory: '',
          categoryId: '',
          tag: '',
          format: '',
          origin: '',
          flavors: [],
        });
        setSaveSuccess(false);
      }, 2000);
    } catch (error) {
      console.error('Lỗi khi lưu sản phẩm:', error);
      alert('Đã xảy ra lỗi khi lưu sản phẩm. Vui lòng thử lại.');
    } finally {
      setIsSaving(false);
    }
  };

  const inputClass = "w-full px-4 py-3 rounded-lg border border-stone-300 focus:border-stone-900 focus:ring-1 focus:ring-stone-900 outline-none transition-all bg-white text-stone-900";
  const labelClass = "block text-sm font-bold text-stone-800 mb-2";

  // Lấy danh sách categories để chọn
  const categories = CATEGORIES.map(cat => ({
    id: cat.id,
    title: cat.title,
  }));

  // Các tag phổ biến
  const commonTags = ['Mới', 'Bán chạy', 'Cao cấp', 'Tiện lợi', 'Thượng hạng', 'Đặc sản', 'VIP', 'Lâu năm'];

  // Các format phổ biến
  const commonFormats = ['Lá rời', 'Túi lọc', 'Bánh', 'Hộp quà', 'Tử Sa', 'Sứ', 'Gốm', 'Thủy tinh', 'Gỗ'];

  return (
    <div className="bg-stone-50 min-h-screen pt-[80px]">
      {/* Header Banner */}
      <div className="bg-stone-950 py-12">
        <div className="container mx-auto px-6 lg:px-12">
          <a href="#account" className="inline-flex items-center gap-2 text-stone-400 hover:text-white mb-6 text-sm font-bold transition-colors">
            <ArrowLeft size={16} /> Back to Account
          </a>
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            Thêm sản phẩm mới
          </h1>
          <p className="text-stone-400 font-light mt-2">Quản lý sản phẩm cửa hàng ChuLeaf Co.</p>
        </div>
      </div>

      <div className="container mx-auto px-6 lg:px-12 py-12 max-w-3xl">
        <div className="bg-white rounded-lg shadow-sm p-8">
          {saveSuccess && (
            <div className="mb-6 bg-rust-50 border border-rust-200 rounded-lg p-4 flex items-center gap-3">
              <div className="w-8 h-8 bg-rust-500 rounded-full flex items-center justify-center flex-shrink-0">
                <Check size={20} className="text-white" />
              </div>
              <div>
                <p className="font-bold text-rust-900">Sản phẩm đã được lưu thành công!</p>
                <p className="text-sm text-rust-700">Sản phẩm đã được thêm vào Firestore collection "products".</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Tên sản phẩm */}
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
                placeholder="Ví dụ: Lục Trà Thái Nguyên - Hộp 50g"
                className={inputClass}
              />
            </div>

            {/* Giá */}
            <div>
              <label htmlFor="price" className={labelClass}>
                Giá (VND) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                id="price"
                name="price"
                required
                min="0"
                value={formData.price}
                onChange={handleChange}
                placeholder="Ví dụ: 125000"
                className={inputClass}
              />
              <p className="text-xs text-stone-500 mt-1">
                Nhập số tiền (không cần dấu phẩy). Hệ thống sẽ tự động format thành "125.000 ₫"
              </p>
            </div>

            {/* Mô tả */}
            <div>
              <label htmlFor="description" className={labelClass}>
                Mô tả sản phẩm
              </label>
              <textarea
                id="description"
                name="description"
                rows={4}
                value={formData.description}
                onChange={handleChange}
                placeholder="Nhập mô tả chi tiết về sản phẩm..."
                className={inputClass}
              />
            </div>

            {/* Link ảnh */}
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
                placeholder="/images/tra-moc-bg.png hoặc https://images.unsplash.com/..."
                className={inputClass}
              />
              <div className="mt-2 space-y-2">
                <p className="text-xs text-stone-500">
                  <strong>Cách 1:</strong> Dùng ảnh từ folder <code className="bg-stone-100 px-1 rounded">public/images</code>
                  <br />
                  Ví dụ: <code className="bg-stone-100 px-1 rounded">/images/tra-moc-bg.png</code>
                </p>
                <p className="text-xs text-stone-500">
                  <strong>Cách 2:</strong> Dùng URL từ bên ngoài (Unsplash, v.v.)
                  <br />
                  Ví dụ: <code className="bg-stone-100 px-1 rounded">https://images.unsplash.com/photo-...</code>
                </p>
                <details className="text-xs">
                  <summary className="cursor-pointer text-stone-600 hover:text-stone-900 font-medium">
                    📁 Xem danh sách ảnh có sẵn trong public/images
                  </summary>
                  <div className="mt-2 bg-stone-50 p-3 rounded border border-stone-200">
                    <p className="font-medium mb-2">Các file ảnh có sẵn:</p>
                    <ul className="list-disc list-inside space-y-1 text-stone-600">
                      <li><code>/images/tra-moc-bg.png</code></li>
                      <li><code>/images/tra-uop-huong.png</code></li>
                      <li><code>/images/tra-cu.png</code> hoặc <code>/images/tra-cu.jpg</code></li>
                      <li><code>/images/qua-tang.jpg</code></li>
                      <li><code>/images/tiec-tra-khoa-hoc.jpg</code></li>
                      <li><code>/images/hero.png</code></li>
                      <li><code>/images/hero1.jpg</code> đến <code>/images/hero7.jpg</code></li>
                    </ul>
                    <p className="mt-2 text-stone-500 italic">
                      💡 Tip: Bạn có thể thêm file ảnh mới vào folder <code>public/images</code> và dùng đường dẫn <code>/images/tên-file.jpg</code>
                    </p>
                  </div>
                </details>
              </div>
              {formData.image && (
                <div className="mt-3">
                  <p className="text-xs text-stone-500 mb-2">Preview:</p>
                  <img
                    src={formData.image.startsWith('/') ? formData.image : formData.image}
                    alt="Preview"
                    className="w-32 h-32 object-cover rounded-lg border border-stone-200"
                    onError={(e) => {
                      const img = e.target as HTMLImageElement;
                      img.style.display = 'none';
                      const errorDiv = document.createElement('div');
                      errorDiv.className = 'text-xs text-red-500 mt-2';
                      errorDiv.textContent = '⚠️ Không thể tải ảnh. Vui lòng kiểm tra lại đường dẫn.';
                      img.parentElement?.appendChild(errorDiv);
                    }}
                  />
                </div>
              )}
            </div>

            {/* Main Category */}
            <div>
              <label htmlFor="mainCategory" className={labelClass}>
                Loại sản phẩm <span className="text-red-500">*</span>
              </label>
              <select
                id="mainCategory"
                name="mainCategory"
                required
                value={formData.mainCategory}
                onChange={handleChange}
                className={inputClass}
              >
                <option value="">Chọn loại sản phẩm</option>
                {Object.entries(MAIN_CATEGORIES).map(([id, label]) => (
                  <option key={id} value={id}>
                    {label}
                  </option>
                ))}
              </select>
            </div>

            {/* Sub Category */}
            {formData.mainCategory && SUB_CATEGORIES[formData.mainCategory] && (
              <div>
                <label htmlFor="categoryId" className={labelClass}>
                  Danh mục con
                </label>
                <select
                  id="categoryId"
                  name="categoryId"
                  value={formData.categoryId}
                  onChange={handleChange}
                  className={inputClass}
                >
                  <option value="">Chọn danh mục con (tùy chọn)</option>
                  {SUB_CATEGORIES[formData.mainCategory].map(subCat => (
                    <option key={subCat.id} value={subCat.id}>
                      {subCat.label}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Tag */}
            <div>
              <label htmlFor="tag" className={labelClass}>
                Tag
              </label>
              <select
                id="tag"
                name="tag"
                value={formData.tag}
                onChange={handleChange}
                className={inputClass}
              >
                <option value="">Chọn tag (tùy chọn)</option>
                {commonTags.map(tag => (
                  <option key={tag} value={tag}>
                    {tag}
                  </option>
                ))}
              </select>
              <p className="text-xs text-stone-500 mt-1">
                Các tag phổ biến: Mới, Bán chạy, Cao cấp, Tiện lợi, Thượng hạng, Đặc sản, VIP, Lâu năm
              </p>
            </div>

            {/* Format - Only for Trà Nguyên Bản and Trà Ướp Hương */}
            {(formData.mainCategory === 'tra-nguyen-ban' || formData.mainCategory === 'tra-uop-huong') && (
              <div>
                <label htmlFor="format" className={labelClass}>
                  Format
                </label>
                <select
                  id="format"
                  name="format"
                  value={formData.format}
                  onChange={handleChange}
                  className={inputClass}
                >
                  <option value="">Chọn format (tùy chọn)</option>
                  {TEA_FORMATS.map(format => (
                    <option key={format} value={format}>
                      {format}
                    </option>
                  ))}
                </select>
                <p className="text-xs text-stone-500 mt-1">
                  Các format: Lá rời, Túi lọc, Bánh
                </p>
              </div>
            )}

            {/* Origin - Only for Trà Nguyên Bản and Trà Ướp Hương */}
            {(formData.mainCategory === 'tra-nguyen-ban' || formData.mainCategory === 'tra-uop-huong') && (
              <div>
                <label htmlFor="origin" className={labelClass}>
                  Xuất xứ
                </label>
                <select
                  id="origin"
                  name="origin"
                  value={formData.origin}
                  onChange={handleChange}
                  className={inputClass}
                >
                  <option value="">Chọn xuất xứ (tùy chọn)</option>
                  {TEA_ORIGINS.map(origin => (
                    <option key={origin} value={origin}>
                      {origin}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Flavors - Only for Trà Nguyên Bản and Trà Ướp Hương */}
            {(formData.mainCategory === 'tra-nguyen-ban' || formData.mainCategory === 'tra-uop-huong') && (
              <div>
                <label className={labelClass}>
                  Hương vị (có thể chọn nhiều)
                </label>
                <div className="space-y-4 border border-stone-200 rounded-lg p-4 bg-stone-50">
                  {Object.entries(FLAVOR_CATEGORIES).map(([key, category]) => (
                    <div key={key} className="space-y-2">
                      <h4 className="font-medium text-stone-700 text-sm">{category.label}</h4>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {category.options.map(flavor => (
                          <label
                            key={flavor}
                            className="flex items-center gap-2 cursor-pointer group"
                          >
                            <input
                              type="checkbox"
                              checked={formData.flavors.includes(flavor)}
                              onChange={() => handleFlavorChange(flavor)}
                              className="w-4 h-4 rounded border-stone-300 text-rust-500 focus:ring-rust-500 cursor-pointer"
                            />
                            <span className="text-sm text-stone-600 group-hover:text-stone-900">
                              {flavor}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                {formData.flavors.length > 0 && (
                  <p className="text-xs text-stone-500 mt-2">
                    Đã chọn: <strong>{formData.flavors.join(', ')}</strong>
                  </p>
                )}
              </div>
            )}

            {/* Submit Button */}
            <div className="pt-6 border-t border-stone-200">
              <Button
                type="submit"
                disabled={isSaving}
                fullWidth
                className="bg-stone-900 hover:bg-stone-800 text-white font-bold py-4 text-base rounded-lg"
              >
                {isSaving ? 'Đang lưu...' : 'Lưu sản phẩm'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

