/**
 * Database Seed Script
 * Tạo dữ liệu mẫu cho blog posts
 */

import { prisma } from '../src/lib/db/prisma';

const blogPosts = [
  {
    title: 'Ý Nghĩa Của Số 1 Trong Thần Số Học - Con Số Của Người Lãnh Đạo',
    slug: 'y-nghia-cua-so-1-trong-than-so-hoc',
    excerpt:
      'Số 1 trong thần số học đại diện cho sự khởi đầu, lãnh đạo và độc lập. Khám phá ý nghĩa sâu xa và cách số 1 ảnh hưởng đến cuộc sống của bạn.',
    content: `<h2>Số 1 - Con Số Của Sự Khởi Đầu</h2>

<p>Trong hệ thống thần số học, số 1 được coi là con số đầu tiên và mạnh mẽ nhất. Nó t상징 cho sự khởi đầu, sự độc lập, và khả năng lãnh đạo bẩm sinh.</p>

<h3>Đặc Điểm Tính Cách Của Số 1</h3>

<p>Những người mang số 1 thường có những đặc điểm nổi bật sau:</p>

<ul>
<li><strong>Tính độc lập cao:</strong> Họ thích làm việc một mình và tin tưởng vào khả năng của bản thân.</li>
<li><strong>Khả năng lãnh đạo:</strong> Bẩm sinh là những nhà lãnh đạo, họ có khả năng truyền cảm hứng cho người khác.</li>
<li><strong>Quyết đoán:</strong> Không ngại đưa ra quyết định và chịu trách nhiệm về chúng.</li>
<li><strong>Sáng tạo:</strong> Luôn có những ý tưởng mới mẻ và độc đáo.</li>
<li><strong>Tham vọng:</strong> Có mục tiêu rõ ràng và quyết tâm đạt được chúng.</li>
</ul>

<h3>Điểm Mạnh</h3>

<p>Số 1 mang lại nhiều điểm mạnh vượt trội:</p>

<ul>
<li>Khả năng khởi xướng và dẫn dắt dự án</li>
<li>Tinh thần tiên phong, không ngại thử nghiệm điều mới</li>
<li>Tự tin và có niềm tin vững chắc vào bản thân</li>
<li>Khả năng tập trung cao độ vào mục tiêu</li>
</ul>

<h3>Thách Thức Cần Vượt Qua</h3>

<p>Tuy nhiên, số 1 cũng đối mặt với một số thách thức:</p>

<ul>
<li>Có thể trở nên độc đoán và cứng đầu</li>
<li>Khó làm việc nhóm do quá tin vào bản thân</li>
<li>Có xu hướng bỏ qua ý kiến người khác</li>
<li>Đôi khi thiếu kiên nhẫn với tốc độ chậm hơn</li>
</ul>

<h3>Sự Nghiệp Phù Hợp</h3>

<p>Những người số 1 thường thành công trong các lĩnh vực:</p>

<ul>
<li>Doanh nhân, CEO, Giám đốc điều hành</li>
<li>Chính trị gia, nhà lãnh đạo cộng đồng</li>
<li>Nghệ sĩ, nhà sáng tạo nội dung</li>
<li>Kỹ sư, nhà phát minh</li>
<li>Huấn luyện viên, người truyền cảm hứng</li>
</ul>

<h3>Lời Khuyên Phát Triển</h3>

<p>Để phát huy tối đa tiềm năng của số 1:</p>

<ol>
<li>Học cách lắng nghe và hợp tác với người khác</li>
<li>Rèn luyện sự kiên nhẫn và đồng cảm</li>
<li>Cân bằng giữa tự tin và khiêm tốn</li>
<li>Tận dụng khả năng lãnh đạo để giúp đỡ người khác</li>
<li>Đặt mục tiêu dài hạn và kiên trì theo đuổi</li>
</ol>`,
    category: 'numerology',
    published: true,
    views: 1250,
    coverImage: '/images/blog/number-1.jpg',
  },
  {
    title: 'Tử Vi Cung Bạch Dương 2024 - Vận Mệnh Và Tính Cách',
    slug: 'tu-vi-cung-bach-duong-2024',
    excerpt:
      'Bạch Dương là cung hoàng đạo đầu tiên, mang năng lượng của sự khởi đầu và nhiệt huyết. Khám phá tử vi chi tiết cho người cung Bạch Dương.',
    content: `<h2>Cung Bạch Dương - Người Tiên Phong</h2>

<p>Bạch Dương (Aries) là cung hoàng đạo đầu tiên trong vòng tròn 12 cung, sinh từ ngày 21/3 đến 19/4. Được cai quản bởi sao Hỏa, Bạch Dương mang trong mình năng lượng mạnh mẽ, quyết đoán và đầy nhiệt huyết.</p>

<h3>Tính Cách Người Cung Bạch Dương</h3>

<p>Những người sinh dưới cung Bạch Dương có những đặc điểm nổi bật:</p>

<ul>
<li><strong>Dũng cảm và can đảm:</strong> Không ngại đối mặt với thử thách</li>
<li><strong>Năng động:</strong> Luôn tràn đầy năng lượng và nhiệt huyết</li>
<li><strong>Thẳng thắn:</strong> Nói những gì họ nghĩ, không vòng vo</li>
<li><strong>Độc lập:</strong> Thích làm mọi việc theo cách riêng của mình</li>
<li><strong>Cạnh tranh:</strong> Thích chiến thắng và là người đầu tiên</li>
</ul>

<h3>Tử Vi Năm 2024</h3>

<h4>Sự Nghiệp</h4>
<p>Năm 2024 là năm đầy hứa hẹn cho Bạch Dương trong công việc. Từ tháng 3 đến tháng 7, bạn sẽ có nhiều cơ hội thăng tiến. Tuy nhiên, cần chú ý không nên quá vội vàng trong các quyết định quan trọng.</p>

<h4>Tài Chính</h4>
<p>Tài chính ổn định nhưng cần có kế hoạch chi tiêu hợp lý. Nửa cuối năm thuận lợi cho đầu tư, đặc biệt là vào tháng 9 và tháng 10.</p>

<h4>Tình Yêu</h4>
<p>Đơn thân: Tháng 4, 6 và 11 là thời điểm tốt để tìm kiếm tình yêu mới.</p>
<p>Đã có đôi: Cần kiên nhẫn và thấu hiểu hơn với nửa kia, tránh tranh cãi không đáng có.</p>

<h4>Sức Khỏe</h4>
<p>Năng lượng dồi dào nhưng cần chú ý nghỉ ngơi đầy đủ. Tránh làm việc quá sức, đặc biệt trong các tháng 5 và 8.</p>

<h3>Màu Sắc May Mắn</h3>
<ul>
<li>Đỏ - tượng trưng cho sức mạnh và nhiệt huyết</li>
<li>Cam - mang lại năng lượng tích cực</li>
<li>Trắng - tượng trưng cho sự trong sáng và mới mẻ</li>
</ul>

<h3>Lời Khuyên</h3>
<p>Hãy tận dụng năng lượng tự nhiên của mình nhưng đừng quên lắng nghe ý kiến người khác. Học cách kiên nhẫn sẽ giúp bạn đạt được nhiều thành công hơn trong năm 2024.</p>`,
    category: 'horoscope',
    published: true,
    views: 2100,
    coverImage: '/images/blog/aries.jpg',
  },
  {
    title: '10 Cách Tăng Vận May Trong Cuộc Sống Theo Thần Số Học',
    slug: '10-cach-tang-van-may-theo-than-so-hoc',
    excerpt:
      'Khám phá những phương pháp đơn giản nhưng hiệu quả để thu hút vận may và thành công vào cuộc sống dựa trên thần số học.',
    content: `<h2>Thu Hút Vận May Với Thần Số Học</h2>

<p>Thần số học không chỉ giúp bạn hiểu về bản thân mà còn có thể giúp bạn cải thiện vận may trong cuộc sống. Dưới đây là 10 cách hiệu quả để tăng vận may dựa trên nguyên lý thần số học.</p>

<h3>1. Sử Dụng Số May Mắn Của Bạn</h3>
<p>Tính toán số đường đời và các số may mắn khác của bạn, sau đó sử dụng chúng trong cuộc sống hàng ngày - từ mã PIN, số điện thoại đến ngày quan trọng.</p>

<h3>2. Đeo Màu Sắc Hợp Mệnh</h3>
<p>Mỗi số có màu sắc tương ứng. Mặc hoặc đeo phụ kiện với màu sắc may mắn của bạn để tăng cường năng lượng tích cực.</p>

<h3>3. Chọn Ngày Tốt Cho Sự Kiện Quan Trọng</h3>
<p>Dựa vào thần số học để chọn ngày thuận lợi cho các sự kiện quan trọng như ký hợp đồng, khai trương, hoặc cưới xỏi.</p>

<h3>4. Bố Trí Không Gian Sống Hợp Số</h3>
<p>Số nhà, số phòng có thể ảnh hưởng đến năng lượng. Chọn không gian sống có số hợp với số đường đời của bạn.</p>

<h3>5. Đặt Tên Hợp Mệnh</h3>
<p>Nếu có thể, chọn tên hoặc nickname có tổng số phù hợp với mục tiêu của bạn.</p>

<h3>6. Thực Hành Thiền Định Với Số</h3>
<p>Mỗi ngày dành vài phút tập trung vào số may mắn của bạn, hình dung năng lượng tích cực từ con số đó.</p>

<h3>7. Mang Theo Biểu Tượng May Mắn</h3>
<p>Có thể là một vật phẩm có số may mắn khắc trên đó, hoặc đơn giản là viết số đó ra giấy mang theo.</p>

<h3>8. Kết Nối Với Người Hợp Số</h3>
<p>Tìm hiểu số đường đời của những người xung quanh, làm việc với những người có số tương thích với bạn.</p>

<h3>9. Lập Kế Hoạch Theo Chu Kỳ Số</h3>
<p>Mỗi năm, tháng có năng lượng số khác nhau. Lập kế hoạch phù hợp với chu kỳ số cá nhân của bạn.</p>

<h3>10. Phát Triển Điểm Mạnh Của Số</h3>
<p>Hiểu rõ điểm mạnh mà số đường đời mang lại và tập trung phát triển những khía cạnh đó.</p>

<h3>Kết Luận</h3>
<p>Vận may không chỉ đến từ may mắn ngẫu nhiên, mà còn từ cách bạn sống và hành động. Bằng cách áp dụng các nguyên lý thần số học, bạn có thể tạo ra những điều kiện thuận lợi hơn cho bản thân.</p>`,
    category: 'tips',
    published: true,
    views: 3450,
    coverImage: '/images/blog/lucky-tips.jpg',
  },
  {
    title: 'Ý Nghĩa Con Số 2 - Sự Hài Hòa Và Hợp Tác',
    slug: 'y-nghia-con-so-2-su-hai-hoa-va-hop-tac',
    excerpt:
      'Số 2 đại diện cho sự cân bằng, hài hòa và khả năng hợp tác. Tìm hiểu cách số 2 ảnh hưởng đến tính cách và vận mệnh.',
    content: `<h2>Số 2 - Con Số Của Sự Cân Bằng</h2>

<p>Trong thần số học, số 2 được biết đến như con số của sự hài hòa, cân bằng và hợp tác. Những người mang số 2 thường có khả năng đặc biệt trong việc tạo dựng mối quan hệ và hòa giải xung đột.</p>

<h3>Đặc Điểm Tính Cách</h3>

<ul>
<li><strong>Nhạy cảm:</strong> Có khả năng cảm nhận cảm xúc của người khác</li>
<li><strong>Hòa bình:</strong> Luôn tìm cách giải quyết vấn đề một cách hài hòa</li>
<li><strong>Hợp tác:</strong> Làm việc nhóm rất hiệu quả</li>
<li><strong>Kiên nhẫn:</strong> Biết chờ đợi thời điểm thích hợp</li>
<li><strong>Thân thiện:</strong> Dễ gần, dễ kết bạn</li>
</ul>

<h3>Điểm Mạnh</h3>

<p>Người số 2 có những điểm mạnh đáng kể:</p>
<ul>
<li>Khả năng lắng nghe và thấu hiểu xuất sắc</li>
<li>Tạo dựng mối quan hệ bền vững</li>
<li>Làm việc nhóm hiệu quả</li>
<li>Khả năng hòa giải và trung gian</li>
<li>Trực giác nhạy bén</li>
</ul>

<h3>Thách Thức</h3>

<ul>
<li>Có thể quá nhạy cảm và dễ bị tổn thương</li>
<li>Khó đưa ra quyết định khi phải lựa chọn</li>
<li>Đôi khi thiếu tự tin vào khả năng bản thân</li>
<li>Có xu hướng phụ thuộc vào người khác</li>
</ul>

<h3>Sự Nghiệp Phù Hợp</h3>

<ul>
<li>Tư vấn, tâm lý học</li>
<li>Ngoại giao, quan hệ quốc tế</li>
<li>Nhân sự, quản trị doanh nghiệp</li>
<li>Y tá, chăm sóc sức khỏe</li>
<li>Giáo viên, huấn luyện viên</li>
</ul>

<h3>Lời Khuyên</h3>

<p>Hãy tự tin hơn vào khả năng của bản thân. Bạn có tài năng đặc biệt trong việc kết nối con người - hãy sử dụng nó để tạo ra giá trị cho cộng đồng.</p>`,
    category: 'numerology',
    published: true,
    views: 980,
    coverImage: '/images/blog/number-2.jpg',
  },
  {
    title: 'Cung Kim Ngưu - Tính Cách Và Vận Mệnh Năm 2024',
    slug: 'cung-kim-nguu-tinh-cach-va-van-menh-2024',
    excerpt:
      'Kim Ngưu là cung hoàng đạo của sự ổn định và bền bỉ. Khám phá đầy đủ về tính cách và vận mệnh người cung Kim Ngưu.',
    content: `<h2>Cung Kim Ngưu - Người Vững Chãi</h2>

<p>Kim Ngưu (Taurus) sinh từ 20/4 đến 20/5, được cai quản bởi Kim tinh. Đây là cung hoàng đạo của sự ổn định, thực tế và kiên trì.</p>

<h3>Tính Cách Kim Ngưu</h3>

<ul>
<li><strong>Đáng tin cậy:</strong> Luôn giữ lời hứa</li>
<li><strong>Kiên nhẫn:</strong> Sẵn sàng chờ đợi điều tốt đẹp</li>
<li><strong>Thực tế:</strong> Đặt chân trên mặt đất, không viển vông</li>
<li><strong>Trung thành:</strong> Coi trọng tình bạn và gia đình</li>
<li><strong>Yêu thích sự thoải mái:</strong> Thích không gian đẹp và thức ăn ngon</li>
</ul>

<h3>Vận Mệnh 2024</h3>

<h4>Công Việc</h4>
<p>Năm 2024 mang đến sự ổn định trong sự nghiệp. Quý 2 và quý 4 là thời điểm thuận lợi cho đàm phán lương và thăng chức.</p>

<h4>Tài Chính</h4>
<p>Tài chính khá tốt, đặc biệt từ tháng 5 đến tháng 10. Đây là thời điểm phù hợp để đầu tư bất động sản hoặc tiết kiệm dài hạn.</p>

<h4>Tình Yêu</h4>
<p>Mối quan hệ tình cảm bền vững và sâu sắc hơn. Tháng 5 và tháng 9 là thời điểm tốt cho việc cầu hôn hoặc kết hôn.</p>

<h4>Sức Khỏe</h4>
<p>Cần chú ý chế độ ăn uống và tập luyện đều đặn. Tránh căng thẳng quá mức trong công việc.</p>`,
    category: 'horoscope',
    published: true,
    views: 1567,
    coverImage: '/images/blog/taurus.jpg',
  },
  {
    title: 'Số 3 Trong Thần Số Học - Sáng Tạo Và Giao Tiếp',
    slug: 'so-3-trong-than-so-hoc-sang-tao-va-giao-tiep',
    excerpt:
      'Số 3 là con số của sự sáng tạo, giao tiếp và biểu đạt. Tìm hiểu làm thế nào để phát huy tối đa năng lực của số 3.',
    content: `<h2>Số 3 - Con Số Của Nghệ Thuật</h2>

<p>Số 3 trong thần số học đại diện cho sự sáng tạo, giao tiếp và biểu đạt bản thân. Những người mang số 3 thường có khiếu nghệ thuật và khả năng truyền đạt xuất sắc.</p>

<h3>Tính Cách Số 3</h3>

<ul>
<li><strong>Sáng tạo:</strong> Luôn có ý tưởng mới lạ</li>
<li><strong>Lạc quan:</strong> Nhìn thế giới qua lăng kính tích cực</li>
<li><strong>Hài hước:</strong> Biết cách làm người khác vui vẻ</li>
<li><strong>Giao tiếp tốt:</strong> Nói chuyện lưu loát và thuyết phục</li>
<li><strong>Đa tài:</strong> Có nhiều sở thích và khả năng khác nhau</li>
</ul>

<h3>Điểm Mạnh</h3>

<ul>
<li>Khả năng biểu đạt bằng lời nói và nghệ thuật</li>
<li>Tư duy sáng tạo không bị giới hạn</li>
<li>Kỹ năng xã hội xuất sắc</li>
<li>Truyền cảm hứng cho người khác</li>
<li>Thích ứng nhanh với thay đổi</li>
</ul>

<h3>Thách Thức</h3>

<ul>
<li>Dễ bị phân tán, khó tập trung</li>
<li>Thiếu tính kỷ luật và kiên trì</li>
<li>Có thể nói nhiều hơn làm</li>
<li>Dễ bị tổn thương bởi lời phê bình</li>
</ul>

<h3>Nghề Nghiệp Phù Hợp</h3>

<ul>
<li>Nghệ sĩ, nhạc sĩ, họa sĩ</li>
<li>Nhà văn, biên tập viên</li>
<li>Diễn viên, MC, người dẫn chương trình</li>
<li>Marketing, PR, quảng cáo</li>
<li>Giáo viên nghệ thuật</li>
</ul>

<h3>Phát Triển Bản Thân</h3>

<p>Để thành công, người số 3 cần học cách tập trung vào một mục tiêu và hoàn thành nó trước khi chuyển sang việc khác. Hãy biến sáng tạo thành hành động cụ thể.</p>`,
    category: 'numerology',
    published: true,
    views: 1890,
    coverImage: '/images/blog/number-3.jpg',
  },
  {
    title: 'Ngũ Hành Kim Mộc Thủy Hỏa Thổ - Cân Bằng Trong Cuộc Sống',
    slug: 'ngu-hanh-kim-moc-thuy-hoa-tho-can-bang',
    excerpt:
      'Tìm hiểu về hệ thống Ngũ Hành và cách áp dụng vào cuộc sống để đạt được sự cân bằng và thành công.',
    content: `<h2>Ngũ Hành - Năm Yếu Tố Cơ Bản</h2>

<p>Ngũ Hành gồm Kim, Mộc, Thủy, Hỏa và Thổ - năm yếu tố cơ bản tạo nên vũ trụ theo triết lý phương Đông. Hiểu và cân bằng các yếu tố này sẽ giúp cuộc sống hài hòa hơn.</p>

<h3>1. Hành Kim</h3>
<p><strong>Đặc tính:</strong> Cứng rắn, quyết đoán, công bằng, chính trực</p>
<p><strong>Màu sắc:</strong> Trắng, vàng kim, xám bạc</p>
<p><strong>Hướng:</strong> Tây</p>
<p><strong>Mùa:</strong> Thu</p>
<p><strong>Nghề nghiệp:</strong> Luật sư, quân nhân, ngân hàng, kỹ thuật</p>

<h3>2. Hành Mộc</h3>
<p><strong>Đặc tính:</strong> Phát triển, sáng tạo, nhân từ, kiên định</p>
<p><strong>Màu sắc:</strong> Xanh lá cây, xanh lục</p>
<p><strong>Hướng:</strong> Đông</p>
<p><strong>Mùa:</strong> Xuân</p>
<p><strong>Nghề nghiệp:</strong> Giáo dục, y tế, nông nghiệp, thiết kế</p>

<h3>3. Hành Thủy</h3>
<p><strong>Đặc tính:</strong> Thông minh, linh hoạt, khéo léo, thích nghi</p>
<p><strong>Màu sắc:</strong> Đen, xanh navy</p>
<p><strong>Hướng:</strong> Bắc</p>
<p><strong>Mùa:</strong> Đông</p>
<p><strong>Nghề nghiệp:</strong> Thương mại, du lịch, truyền thông, nghệ thuật</p>

<h3>4. Hành Hỏa</h3>
<p><strong>Đặc tính:</strong> Nhiệt huyết, năng động, đam mê, lạc quan</p>
<p><strong>Màu sắc:</strong> Đỏ, cam, hồng</p>
<p><strong>Hướng:</strong> Nam</p>
<p><strong>Mùa:</strong> Hè</p>
<p><strong>Nghề nghiệp:</strong> Nghệ thuật biểu diễn, thể thao, giải trí, PR</p>

<h3>5. Hành Thổ</h3>
<p><strong>Đặc tính:</strong> Ổn định, chân thành, tin cậy, kiên nhẫn</p>
<p><strong>Màu sắc:</strong> Vàng, nâu, be</p>
<p><strong>Hướng:</strong> Trung tâm</p>
<p><strong>Mùa:</strong> Giao mùa</p>
<p><strong>Nghề nghiệp:</strong> Bất động sản, xây dựng, kinh doanh, quản lý</p>

<h3>Quy Luật Tương Sinh - Tương Khắc</h3>

<h4>Tương Sinh (hỗ trợ lẫn nhau):</h4>
<ul>
<li>Thủy → Mộc (nước nuôi cây)</li>
<li>Mộc → Hỏa (gỗ sinh lửa)</li>
<li>Hỏa → Thổ (lửa tạo tro thành đất)</li>
<li>Thổ → Kim (đất sinh kim loại)</li>
<li>Kim → Thủy (kim làm tan băng thành nước)</li>
</ul>

<h4>Tương Khắc (kiềm chế lẫn nhau):</h4>
<ul>
<li>Kim khắc Mộc</li>
<li>Mộc khắc Thổ</li>
<li>Thổ khắc Thủy</li>
<li>Thủy khắc Hỏa</li>
<li>Hỏa khắc Kim</li>
</ul>

<h3>Ứng Dụng Trong Cuộc Sống</h3>

<p>Hiểu mệnh của bạn thuộc hành nào và cân bằng các yếu tố qua:</p>
<ul>
<li>Lựa chọn màu sắc trang phục</li>
<li>Bố trí nội thất, phong thủy nhà cửa</li>
<li>Chọn hướng đi lại, làm việc</li>
<li>Lựa chọn nghề nghiệp phù hợp</li>
<li>Chọn thời điểm tốt cho các sự kiện quan trọng</li>
</ul>`,
    category: 'tips',
    published: true,
    views: 2780,
    coverImage: '/images/blog/five-elements.jpg',
  },
  {
    title: 'Số 4 - Nền Tảng Vững Chắc Và Kỷ Luật',
    slug: 'so-4-nen-tang-vung-chac-va-ky-luat',
    excerpt:
      'Số 4 đại diện cho sự ổn định, trật tự và làm việc chăm chỉ. Khám phá sức mạnh của người số 4.',
    content: `<h2>Số 4 - Người Xây Dựng</h2>

<p>Số 4 trong thần số học là con số của sự ổn định, tổ chức và lao động cần cù. Những người mang số 4 là những người xây dựng nền tảng vững chắc cho thành công.</p>

<h3>Đặc Điểm Tính Cách</h3>

<ul>
<li><strong>Thực tế:</strong> Luôn đi vào vấn đề cụ thể</li>
<li><strong>Có tổ chức:</strong> Mọi thứ đều được sắp xếp ngăn nắp</li>
<li><strong>Chăm chỉ:</strong> Sẵn sàng làm việc vất vả để đạt mục tiêu</li>
<li><strong>Đáng tin cậy:</strong> Người khác có thể tin tưởng hoàn toàn</li>
<li><strong>Kiên trì:</strong> Không dễ dàng bỏ cuộc</li>
</ul>

<h3>Điểm Mạnh</h3>

<ul>
<li>Kỷ luật tự giác cao</li>
<li>Khả năng lập kế hoạch chi tiết</li>
<li>Làm việc có hệ thống và hiệu quả</li>
<li>Hoàn thành công việc đúng hạn</li>
<li>Tạo nền tảng vững chắc cho tương lai</li>
</ul>

<h3>Thách Thức</h3>

<ul>
<li>Có thể quá cứng nhắc và thiếu linh hoạt</li>
<li>Khó thay đổi khi đã quen với một phương pháp</li>
<li>Đôi khi quá nghiêm khắc với bản thân và người khác</li>
<li>Khó thể hiện cảm xúc</li>
</ul>

<h3>Sự Nghiệp</h3>

<ul>
<li>Kế toán, kiểm toán</li>
<li>Kỹ sư, kiến trúc sư</li>
<li>Quản lý dự án</li>
<li>Quân đội, cảnh sát</li>
<li>Nghiên cứu khoa học</li>
</ul>

<h3>Lời Khuyên</h3>

<p>Hãy học cách linh hoạt hơn và đừng quá khắt khe với bản thân. Đôi khi việc thả lỏng một chút sẽ mang lại hiệu quả tốt hơn.</p>`,
    category: 'numerology',
    published: true,
    views: 1234,
    coverImage: '/images/blog/number-4.jpg',
  },
  {
    title: 'Cung Song Tử - Đa Diện Và Linh Hoạt',
    slug: 'cung-song-tu-da-dien-va-linh-hoat',
    excerpt:
      'Song Tử là cung hoàng đạo của sự đa dạng và giao tiếp. Tìm hiểu về tính cách độc đáo của người cung Song Tử.',
    content: `<h2>Cung Song Tử - Người Giao Tiếp</h2>

<p>Song Tử (Gemini) sinh từ 21/5 đến 20/6, được cai quản bởi Thủy tinh. Đây là cung hoàng đạo của sự đa diện, thông minh và giao tiếp.</p>

<h3>Tính Cách Song Tử</h3>

<ul>
<li><strong>Thông minh:</strong> Học nhanh và hiểu biết nhiều lĩnh vực</li>
<li><strong>Giao tiếp tốt:</strong> Nói chuyện lưu loát với bất kỳ ai</li>
<li><strong>Linh hoạt:</strong> Thích ứng nhanh với mọi tình huống</li>
<li><strong>Tò mò:</strong> Luôn muốn học hỏi điều mới</li>
<li><strong>Đa năng:</strong> Có nhiều sở thích và tài năng</li>
</ul>

<h3>Điểm Mạnh</h3>

<ul>
<li>Khả năng xử lý nhiều việc cùng lúc</li>
<li>Tư duy nhanh nhạy và sáng tạo</li>
<li>Kết bạn dễ dàng</li>
<li>Thích ứng tốt với thay đổi</li>
<li>Truyền đạt ý tưởng hiệu quả</li>
</ul>

<h3>Thách Thức</h3>

<ul>
<li>Dễ thay đổi ý kiến</li>
<li>Khó tập trung vào một việc lâu dài</li>
<li>Có thể nói nhiều hơn làm</li>
<li>Thiếu kiên nhẫn với chi tiết</li>
</ul>

<h3>Vận Mệnh 2024</h3>

<p><strong>Sự nghiệp:</strong> Nhiều cơ hội mới, đặc biệt trong lĩnh vực truyền thông và công nghệ.</p>

<p><strong>Tài chính:</strong> Thu nhập không ổn định nhưng có xu hướng tăng từ quý 3.</p>

<p><strong>Tình yêu:</strong> Gặp gỡ nhiều người mới, nhưng cần thời gian để tìm người phù hợp.</p>

<p><strong>Sức khỏe:</strong> Cần nghỉ ngơi đầy đủ, tránh làm việc quá sức.</p>`,
    category: 'horoscope',
    published: true,
    views: 1789,
    coverImage: '/images/blog/gemini.jpg',
  },
  {
    title: 'Số 5 - Tự Do Và Phiêu Lưu',
    slug: 'so-5-tu-do-va-phieu-luu',
    excerpt:
      'Số 5 là con số của sự tự do, thay đổi và phiêu lưu. Khám phá năng lượng năng động của số 5.',
    content: `<h2>Số 5 - Người Tự Do</h2>

<p>Số 5 trong thần số học đại diện cho sự tự do, linh hoạt và khám phá. Những người mang số 5 yêu thích sự thay đổi và không thích bị ràng buộc.</p>

<h3>Tính Cách Số 5</h3>

<ul>
<li><strong>Tự do:</strong> Không thích bị kiểm soát hay ràng buộc</li>
<li><strong>Phiêu lưu:</strong> Thích khám phá điều mới lạ</li>
<li><strong>Năng động:</strong> Luôn trong trạng thái di chuyển</li>
<li><strong>Đa dạng:</strong> Có nhiều sở thích và trải nghiệm</li>
<li><strong>Thích nghi:</strong> Dễ dàng chấp nhận thay đổi</li>
</ul>

<h3>Điểm Mạnh</h3>

<ul>
<li>Dám mạo hiểm và thử nghiệm</li>
<li>Thích ứng tốt với môi trường mới</li>
<li>Tư duy đa chiều</li>
<li>Khả năng giao tiếp với nhiều người</li>
<li>Học hỏi nhanh từ kinh nghiệm</li>
</ul>

<h3>Thách Thức</h3>

<ul>
<li>Thiếu tính kiên định</li>
<li>Khó cam kết dài hạn</li>
<li>Dễ bị phân tâm</li>
<li>Có thể bốc đồng trong quyết định</li>
</ul>

<h3>Nghề Nghiệp Phù Hợp</h3>

<ul>
<li>Du lịch, hướng dẫn viên</li>
<li>Nhà báo, phóng viên</li>
<li>Bán hàng, marketing</li>
<li>Phi công, thủy thủ</li>
<li>Freelancer, tự do nghề</li>
</ul>

<h3>Phát Triển</h3>

<p>Học cách cân bằng giữa tự do và trách nhiệm. Đôi khi việc cam kết với một điều gì đó sẽ mang lại sự tự do lớn hơn.</p>`,
    category: 'numerology',
    published: true,
    views: 2156,
    coverImage: '/images/blog/number-5.jpg',
  },
];

async function main() {
  console.log('🌱 Starting database seed...');

  // Insert blog posts
  for (const post of blogPosts) {
    try {
      await prisma.blogPost.upsert({
        where: { slug: post.slug },
        update: post,
        create: post,
      });
      console.log(`✅ Created/Updated blog post: ${post.title}`);
    } catch (error) {
      console.error(`❌ Error creating blog post "${post.title}":`, error);
    }
  }

  console.log('✅ Database seed completed!');
  console.log(`📝 Total blog posts: ${blogPosts.length}`);
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
