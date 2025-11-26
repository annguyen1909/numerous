-- Insert 10 Blog Posts for Vietnamese Numerology Website
-- Run this in Supabase SQL Editor

INSERT INTO "BlogPost" ("id", "title", "slug", "excerpt", "content", "category", "published", "views", "coverImage", "createdAt", "updatedAt")
VALUES
-- Blog 1
(
  gen_random_uuid()::TEXT,
  'Ý Nghĩa Của Số 1 Trong Thần Số Học - Con Số Của Người Lãnh Đạo',
  'y-nghia-cua-so-1-trong-than-so-hoc',
  'Số 1 trong thần số học đại diện cho sự khởi đầu, lãnh đạo và độc lập. Khám phá ý nghĩa sâu xa và cách số 1 ảnh hưởng đến cuộc sống của bạn.',
  '<h2>Số 1 - Con Số Của Sự Khởi Đầu</h2>
<p>Trong hệ thống thần số học, số 1 được coi là con số đầu tiên và mạnh mẽ nhất.</p>
<h3>Đặc Điểm Tính Cách Của Số 1</h3>
<ul>
<li><strong>Tính độc lập cao:</strong> Họ thích làm việc một mình và tin tưởng vào khả năng của bản thân.</li>
<li><strong>Khả năng lãnh đạo:</strong> Bẩm sinh là những nhà lãnh đạo.</li>
<li><strong>Quyết đoán:</strong> Không ngại đưa ra quyết định.</li>
</ul>',
  'numerology',
  TRUE,
  1250,
  '/images/blog/number-1.jpg',
  NOW(),
  NOW()
),

-- Blog 2
(
  gen_random_uuid()::TEXT,
  'Tử Vi Cung Bạch Dương 2024 - Vận Mệnh Và Tính Cách',
  'tu-vi-cung-bach-duong-2024',
  'Bạch Dương là cung hoàng đạo đầu tiên, mang năng lượng của sự khởi đầu và nhiệt huyết. Khám phá tử vi chi tiết cho người cung Bạch Dương.',
  '<h2>Cung Bạch Dương - Người Tiên Phong</h2>
<p>Bạch Dương (Aries) là cung hoàng đạo đầu tiên, sinh từ ngày 21/3 đến 19/4.</p>
<h3>Tính Cách</h3>
<ul>
<li>Dũng cảm và can đảm</li>
<li>Năng động và nhiệt huyết</li>
<li>Thẳng thắn</li>
</ul>',
  'horoscope',
  TRUE,
  2100,
  '/images/blog/aries.jpg',
  NOW(),
  NOW()
),

-- Blog 3
(
  gen_random_uuid()::TEXT,
  '10 Cách Tăng Vận May Trong Cuộc Sống Theo Thần Số Học',
  '10-cach-tang-van-may-theo-than-so-hoc',
  'Khám phá những phương pháp đơn giản nhưng hiệu quả để thu hút vận may và thành công vào cuộc sống dựa trên thần số học.',
  '<h2>Thu Hút Vận May Với Thần Số Học</h2>
<p>Thần số học không chỉ giúp bạn hiểu về bản thân mà còn có thể giúp bạn cải thiện vận may.</p>
<ol>
<li>Sử dụng số may mắn của bạn</li>
<li>Đeo màu sắc hợp mệnh</li>
<li>Chọn ngày tốt cho sự kiện quan trọng</li>
</ol>',
  'tips',
  TRUE,
  3450,
  '/images/blog/lucky-tips.jpg',
  NOW(),
  NOW()
),

-- Blog 4
(
  gen_random_uuid()::TEXT,
  'Ý Nghĩa Con Số 2 - Sự Hài Hòa Và Hợp Tác',
  'y-nghia-con-so-2-su-hai-hoa-va-hop-tac',
  'Số 2 đại diện cho sự cân bằng, hài hòa và khả năng hợp tác. Tìm hiểu cách số 2 ảnh hưởng đến tính cách và vận mệnh.',
  '<h2>Số 2 - Con Số Của Sự Cân Bằng</h2>
<p>Số 2 được biết đến như con số của sự hài hòa, cân bằng và hợp tác.</p>
<h3>Đặc Điểm</h3>
<ul>
<li>Nhạy cảm và thấu hiểu</li>
<li>Hòa bình</li>
<li>Hợp tác tốt</li>
</ul>',
  'numerology',
  TRUE,
  980,
  '/images/blog/number-2.jpg',
  NOW(),
  NOW()
),

-- Blog 5
(
  gen_random_uuid()::TEXT,
  'Cung Kim Ngưu - Tính Cách Và Vận Mệnh Năm 2024',
  'cung-kim-nguu-tinh-cach-va-van-menh-2024',
  'Kim Ngưu là cung hoàng đạo của sự ổn định và bền bỉ. Khám phá đầy đủ về tính cách và vận mệnh người cung Kim Ngưu.',
  '<h2>Cung Kim Ngưu - Người Vững Chãi</h2>
<p>Kim Ngưu (Taurus) sinh từ 20/4 đến 20/5, được cai quản bởi Kim tinh.</p>
<h3>Tính Cách</h3>
<ul>
<li>Đáng tin cậy</li>
<li>Kiên nhẫn</li>
<li>Trung thành</li>
</ul>',
  'horoscope',
  TRUE,
  1567,
  '/images/blog/taurus.jpg',
  NOW(),
  NOW()
),

-- Blog 6
(
  gen_random_uuid()::TEXT,
  'Số 3 Trong Thần Số Học - Sáng Tạo Và Giao Tiếp',
  'so-3-trong-than-so-hoc-sang-tao-va-giao-tiep',
  'Số 3 là con số của sự sáng tạo, giao tiếp và biểu đạt. Tìm hiểu làm thế nào để phát huy tối đa năng lực của số 3.',
  '<h2>Số 3 - Con Số Của Nghệ Thuật</h2>
<p>Số 3 đại diện cho sự sáng tạo, giao tiếp và biểu đạt bản thân.</p>
<h3>Tính Cách</h3>
<ul>
<li>Sáng tạo</li>
<li>Lạc quan</li>
<li>Hài hước</li>
</ul>',
  'numerology',
  TRUE,
  1890,
  '/images/blog/number-3.jpg',
  NOW(),
  NOW()
),

-- Blog 7
(
  gen_random_uuid()::TEXT,
  'Ngũ Hành Kim Mộc Thủy Hỏa Thổ - Cân Bằng Trong Cuộc Sống',
  'ngu-hanh-kim-moc-thuy-hoa-tho-can-bang',
  'Tìm hiểu về hệ thống Ngũ Hành và cách áp dụng vào cuộc sống để đạt được sự cân bằng và thành công.',
  '<h2>Ngũ Hành - Năm Yếu Tố Cơ Bản</h2>
<p>Ngũ Hành gồm Kim, Mộc, Thủy, Hỏa và Thổ - năm yếu tố cơ bản tạo nên vũ trụ.</p>
<h3>1. Hành Kim</h3>
<p>Cứng rắn, quyết đoán, công bằng</p>
<h3>2. Hành Mộc</h3>
<p>Phát triển, sáng tạo, nhân từ</p>',
  'tips',
  TRUE,
  2780,
  '/images/blog/five-elements.jpg',
  NOW(),
  NOW()
),

-- Blog 8
(
  gen_random_uuid()::TEXT,
  'Số 4 - Nền Tảng Vững Chắc Và Kỷ Luật',
  'so-4-nen-tang-vung-chac-va-ky-luat',
  'Số 4 đại diện cho sự ổn định, trật tự và làm việc chăm chỉ. Khám phá sức mạnh của người số 4.',
  '<h2>Số 4 - Người Xây Dựng</h2>
<p>Số 4 là con số của sự ổn định, tổ chức và lao động cần cù.</p>
<h3>Đặc Điểm</h3>
<ul>
<li>Thực tế</li>
<li>Có tổ chức</li>
<li>Chăm chỉ</li>
</ul>',
  'numerology',
  TRUE,
  1234,
  '/images/blog/number-4.jpg',
  NOW(),
  NOW()
),

-- Blog 9
(
  gen_random_uuid()::TEXT,
  'Cung Song Tử - Đa Diện Và Linh Hoạt',
  'cung-song-tu-da-dien-va-linh-hoat',
  'Song Tử là cung hoàng đạo của sự đa dạng và giao tiếp. Tìm hiểu về tính cách độc đáo của người cung Song Tử.',
  '<h2>Cung Song Tử - Người Giao Tiếp</h2>
<p>Song Tử (Gemini) sinh từ 21/5 đến 20/6, được cai quản bởi Thủy tinh.</p>
<h3>Tính Cách</h3>
<ul>
<li>Thông minh</li>
<li>Giao tiếp tốt</li>
<li>Linh hoạt</li>
</ul>',
  'horoscope',
  TRUE,
  1789,
  '/images/blog/gemini.jpg',
  NOW(),
  NOW()
),

-- Blog 10
(
  gen_random_uuid()::TEXT,
  'Số 5 - Tự Do Và Phiêu Lưu',
  'so-5-tu-do-va-phieu-luu',
  'Số 5 là con số của sự tự do, thay đổi và phiêu lưu. Khám phá năng lượng năng động của số 5.',
  '<h2>Số 5 - Người Tự Do</h2>
<p>Số 5 đại diện cho sự tự do, linh hoạt và khám phá.</p>
<h3>Tính Cách</h3>
<ul>
<li>Tự do</li>
<li>Phiêu lưu</li>
<li>Năng động</li>
</ul>',
  'numerology',
  TRUE,
  2156,
  '/images/blog/number-5.jpg',
  NOW(),
  NOW()
)

ON CONFLICT ("slug") DO NOTHING;

-- Verify the inserts
SELECT title, slug, category, views, published FROM "BlogPost" ORDER BY "createdAt" DESC;
