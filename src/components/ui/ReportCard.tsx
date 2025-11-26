/**
 * Report Card Component
 * Component hiển thị kết quả báo cáo Thần số học hoặc Tử vi
 */

'use client';

import { NumerologyResult, HoroscopeResult } from '@/types';
import PremiumBadge from '../ui/PremiumBadge';
import { Bot, Hash, Target, Palette, Sparkles, AlertTriangle, Briefcase, Star, CheckCircle } from 'lucide-react';

interface ReportCardProps {
  type: 'numerology' | 'horoscope';
  data: NumerologyResult | HoroscopeResult;
  content: string;
  isPremium?: boolean;
}

export default function ReportCard({ type, data, content, isPremium = false }: ReportCardProps) {
  if (type === 'numerology') {
    const numerologyData = data as NumerologyResult;

    // Enhanced detailed descriptions for each number
    const getLifePathDescription = (num: number) => {
      const descriptions: Record<number, string> = {
        1: "Bạn là người tiên phong, độc lập và có khả năng lãnh đạo bẩm sinh. Số Đường Đời 1 biểu thị sự khởi đầu, sáng tạo và quyết tâm. Bạn có xu hướng muốn là người đầu tiên, làm chủ cuộc chơi và không thích phụ thuộc vào người khác. Tinh thần dám nghĩ dám làm cùng với sự tự tin giúp bạn vượt qua nhiều thử thách trong cuộc sống. Tuy nhiên, đôi khi bạn cần học cách lắng nghe và hợp tác với người khác thay vì luôn muốn làm theo ý mình. Sự kiên trì và lòng quyết tâm của bạn sẽ đưa bạn đến thành công nếu bạn biết cân bằng giữa tính độc lập và khả năng làm việc nhóm.",
        2: "Con số 2 đại diện cho sự hòa hợp, hợp tác và nhạy cảm. Bạn là người có khả năng thấu hiểu cảm xúc người khác xuất sắc, luôn mong muốn tạo ra môi trường hòa bình và cân bằng. Bạn thích làm việc nhóm hơn là một mình, và có khả năng ngoại giao tự nhiên giúp bạn giải quyết xung đột một cách khéo léo. Tuy nhiên, bạn đôi khi quá nhạy cảm với lời nói và hành động của người khác, dẫn đến việc dễ bị tổn thương. Học cách đặt ranh giới và không quá phụ thuộc vào ý kiến người khác sẽ giúp bạn phát triển mạnh mẽ hơn. Sự kiên nhẫn và khả năng hỗ trợ của bạn là tài sản quý giá trong bất kỳ mối quan hệ nào.",
        3: "Số 3 mang năng lượng sáng tạo, vui vẻ và giao tiếp xuất sắc. Bạn có khả năng diễn đạt bản thân một cách tự nhiên và thu hút, thích thể hiện ý tưởng qua nghệ thuật, lời nói hoặc văn bản. Bạn là người lạc quan, có khiếu hài hước và luôn tìm thấy niềm vui trong cuộc sống. Tuy nhiên, đôi khi bạn dễ phân tán và thiếu tập trung, khiến bạn khó hoàn thành những dự án dài hạn. Học cách quản lý thời gian và kỷ luật bản thân sẽ giúp bạn phát huy tối đa tiềm năng sáng tạo của mình. Khả năng truyền cảm hứng và khiến người khác cảm thấy thoải mái là điểm mạnh lớn nhất của bạn.",
        4: "Con số 4 biểu thị sự ổn định, thực tế và chăm chỉ. Bạn là người có kế hoạch rõ ràng, thích sự trật tự và tin vào giá trị của công việc chăm chỉ. Bạn xây dựng mọi thứ từng bước một cách vững chắc, không thích mạo hiểm hoặc thay đổi đột ngột. Tính kiên trì và sự tận tụy giúp bạn đạt được mục tiêu dài hạn, nhưng đôi khi bạn cần học cách linh hoạt hơn và không quá cứng nhắc. Khả năng tổ chức và quản lý tốt khiến bạn trở thành người đáng tin cậy trong công việc và cuộc sống. Bạn cần cân bằng giữa công việc và nghỉ ngơi để tránh quá tải.",
        5: "Số 5 đại diện cho sự tự do, phiêu lưu và thích thay đổi. Bạn là người năng động, tò mò và luôn tìm kiếm những trải nghiệm mới. Bạn không thích bị gò bó bởi quy tắc hay thói quen cứng nhắc, và luôn muốn khám phá thế giới xung quanh. Tuy nhiên, sự thiếu kiên định đôi khi khiến bạn khó duy trì một công việc hoặc mối quan hệ lâu dài. Học cách cam kết và tập trung vào những điều quan trọng sẽ giúp bạn đạt được nhiều thành công hơn. Khả năng thích nghi nhanh và tinh thần phiêu lưu là tài sản quý giá giúp bạn vượt qua thử thách.",
        6: "Con số 6 mang năng lượng của tình yêu, trách nhiệm và sự chăm sóc. Bạn có bản tính ấm áp, quan tâm đến người khác và luôn sẵn sàng giúp đỡ. Bạn coi trọng gia đình và các mối quan hệ, thích tạo ra môi trường hòa thuận và ấm cúng. Tuy nhiên, đôi khi bạn quá hy sinh bản thân vì người khác, dẫn đến việc bỏ quên nhu cầu của chính mình. Học cách nói 'không' và chăm sóc bản thân là điều quan trọng để bạn không bị kiệt sức. Khả năng tạo sự cân bằng và hòa hợp trong các mối quan hệ là điểm mạnh lớn của bạn.",
        7: "Số 7 biểu thị sự tìm kiếm trí tuệ, tâm linh và sự sâu sắc. Bạn là người suy nghĩ nhiều, thích nghiên cứu và tìm hiểu những điều bí ẩn. Bạn có khả năng phân tích tốt và thường tìm kiếm ý nghĩa sâu xa của cuộc sống. Tuy nhiên, đôi khi bạn có xu hướng cô lập bản thân và khó chia sẻ cảm xúc với người khác. Học cách cởi mở hơn và kết nối với người khác sẽ giúp bạn cảm thấy hạnh phúc hơn. Trí tuệ và sự thấu hiểu sâu sắc của bạn là nguồn sức mạnh giúp bạn giải quyết nhiều vấn đề phức tạp.",
        8: "Con số 8 đại diện cho quyền lực, thành công vật chất và tham vọng. Bạn có khả năng lãnh đạo mạnh mẽ, tầm nhìn xa và luôn hướng đến thành công lớn. Bạn giỏi quản lý tài chính và có khả năng biến ý tưởng thành hiện thực. Tuy nhiên, đôi khi bạn quá tập trung vào công việc và tiền bạc, khiến bạn bỏ quên các giá trị tinh thần và mối quan hệ. Học cách cân bằng giữa thành công vật chất và hạnh phúc tinh thần sẽ giúp bạn sống một cuộc đời trọn vẹn hơn. Sự quyết đoán và khả năng tổ chức xuất sắc là chìa khóa thành công của bạn.",
        9: "Số 9 mang năng lượng của lòng nhân ái, sự hoàn thiện và tầm nhìn toàn cầu. Bạn có trái tim rộng lớn, quan tâm đến nhân loại và mong muốn tạo ra sự thay đổi tích cực cho thế giới. Bạn thấu hiểu cảm xúc sâu sắc và có khả năng kết nối với nhiều người khác nhau. Tuy nhiên, đôi khi bạn quá lý tưởng hóa mọi thứ và dễ thất vọng khi thực tế không như mong đợi. Học cách chấp nhận sự không hoàn hảo và tập trung vào những điều có thể làm được sẽ giúp bạn hiệu quả hơn. Lòng từ bi và tinh thần phụng sự của bạn là món quà quý giá cho thế giới.",
        11: "Số 11 là Master Number, đại diện cho trực giác mạnh mẽ, tâm linh và sứ mệnh cao cả. Bạn có khả năng cảm nhận năng lượng và thông điệp tinh thần một cách nhạy bén. Bạn thường được dẫn dắt bởi trực giác và có xu hướng tìm kiếm ý nghĩa sâu xa trong cuộc sống. Tuy nhiên, sức mạnh của số 11 cũng đi kèm với áp lực lớn và sự nhạy cảm cao. Học cách bảo vệ năng lượng của bản thân và không để cảm xúc tiêu cực ảnh hưởng là điều quan trọng. Khả năng truyền cảm hứng và soi sáng con đường cho người khác là sứ mệnh đặc biệt của bạn.",
        22: "Số 22 là Master Number đại diện cho khả năng biến ước mơ thành hiện thực ở quy mô lớn. Bạn có tầm nhìn xa, khả năng tổ chức xuất sắc và sức mạnh để xây dựng những điều vĩ đại. Bạn kết hợp được tính thực tế với tham vọng cao, giúp bạn tạo ra tác động lâu dài cho xã hội. Tuy nhiên, sức ép để đạt được thành công lớn có thể khiến bạn căng thẳng và mệt mỏi. Học cách quản lý năng lượng và không đặt quá nhiều áp lực lên bản thân sẽ giúp bạn duy trì sự cân bằng. Khả năng lãnh đạo và xây dựng di sản là món quà đặc biệt của bạn.",
        33: "Số 33 là Master Number cao nhất, biểu thị tình yêu vô điều kiện, sự hy sinh và khả năng chữa lành. Bạn có trái tim rộng mở, luôn muốn giúp đỡ người khác và tạo ra sự hòa hợp trong thế giới. Bạn có khả năng truyền cảm hứng mạnh mẽ và là nguồn động lực cho nhiều người. Tuy nhiên, sứ mệnh cao cả này cũng đòi hỏi bạn phải hy sinh nhiều, và đôi khi bạn cần học cách chăm sóc bản thân trước. Không ai có thể cứu được cả thế giới một mình, và việc đặt ranh giới sẽ giúp bạn bền bỉ hơn trong hành trình. Khả năng chữa lành và nâng đỡ người khác là năng lực thiêng liêng của bạn."
      };
      return descriptions[num] || `Số ${num} mang những đặc điểm độc đáo và năng lượng riêng biệt trong cuộc đời bạn.`;
    };

    const getExpressionDescription = (num: number) => {
      const base = `Số Biểu Đạt ${num} thể hiện cách bạn thể hiện bản thân với thế giới bên ngoài, tài năng tự nhiên và cách bạn tiếp cận cuộc sống. `;
      const details: Record<number, string> = {
        1: "Bạn thể hiện mình như một nhà lãnh đạo tự tin, luôn đi đầu và không ngại thử thách. Phong cách giao tiếp của bạn trực tiếp, rõ ràng và quyết đoán.",
        2: "Bạn thể hiện bản thân một cách nhẹ nhàng, hòa nhã và luôn quan tâm đến cảm xúc người khác. Tài năng ngoại giao giúp bạn dễ dàng kết nối với mọi người.",
        3: "Bạn thể hiện mình qua sự sáng tạo, vui tươi và giao tiếp lưu loát. Khả năng kể chuyện và truyền cảm hứng là điểm đặc biệt của bạn.",
        4: "Bạn thể hiện bản thân qua sự đáng tin cậy, kỷ luật và thực tế. Mọi người biết họ có thể tin tưởng vào bạn để hoàn thành công việc.",
        5: "Bạn thể hiện mình như một người năng động, thích phiêu lưu và linh hoạt. Khả năng thích nghi nhanh khiến bạn nổi bật.",
        6: "Bạn thể hiện tình yêu thương và sự quan tâm một cách tự nhiên. Mọi người cảm nhận được sự ấm áp và chân thành từ bạn.",
        7: "Bạn thể hiện trí tuệ, sự sâu sắc và tính độc lập. Cách tiếp cận suy nghĩ kỹ lưỡng giúp bạn đưa ra những phân tích chất lượng.",
        8: "Bạn thể hiện sức mạnh, quyền lực và tham vọng. Phong thái chuyên nghiệp và quyết đoán giúp bạn gây ấn tượng mạnh.",
        9: "Bạn thể hiện lòng từ bi, sự thấu hiểu và tầm nhìn nhân văn. Khả năng kết nối với đa dạng mọi người là tài sản quý."
      };
      return base + (details[num] || "Bạn có cách thể hiện độc đáo riêng biệt.");
    };

    const getSoulUrgeDescription = (num: number) => {
      const base = `Số Linh Hồn ${num} tiết lộ những khao khát sâu thẳm nhất, động lực nội tâm và điều gì thực sự làm bạn hạnh phúc. `;
      const details: Record<number, string> = {
        1: "Bạn khao khát sự độc lập, tự do và khả năng tự quyết định. Bạn muốn được công nhận là người tiên phong và không thích phụ thuộc.",
        2: "Bạn khao khát sự hòa hợp, kết nối sâu sắc và được yêu thương. Hạnh phúc của bạn đến từ các mối quan hệ ý nghĩa.",
        3: "Bạn khao khát sự sáng tạo, tự do thể hiện và niềm vui. Bạn cần không gian để biểu đạt bản thân một cách nghệ thuật.",
        4: "Bạn khao khát sự ổn định, an toàn và cảm giác kiểm soát cuộc sống. Xây dựng nền tảng vững chắc là điều quan trọng với bạn.",
        5: "Bạn khao khát tự do, phiêu lưu và trải nghiệm mới. Sự đa dạng và thay đổi là nguồn năng lượng của bạn.",
        6: "Bạn khao khát được chăm sóc người khác và tạo ra môi trường ấm áp. Gia đình và tình yêu là ưu tiên hàng đầu.",
        7: "Bạn khao khát trí tuệ, sự thật và hiểu biết sâu sắc. Bạn cần thời gian một mình để suy ngẫm và tìm kiếm ý nghĩa.",
        8: "Bạn khao khát thành công, quyền lực và sự công nhận. Bạn muốn để lại dấu ấn và đạt được thành tựu lớn.",
        9: "Bạn khao khát tạo ra sự thay đổi tích cực cho thế giới. Phụng sự nhân loại là động lực mạnh mẽ của bạn."
      };
      return base + (details[num] || "Bạn có những khao khát nội tâm độc đáo.");
    };

    const getPersonalityDescription = (num: number) => {
      const base = `Số Tính Cách ${num} là ấn tượng đầu tiên mà bạn tạo ra với người khác, bề ngoài mà người ta nhìn thấy trước khi hiểu sâu về bạn. `;
      const details: Record<number, string> = {
        1: "Bạn tỏa ra năng lượng của một nhà lãnh đạo mạnh mẽ, tự tin và quyết đoán. Người khác cảm nhận được sự độc lập và khả năng tự chủ từ bạn. Bạn thường được nhìn nhận là người có tầm nhìn và không ngại đương đầu với thử thách. Phong cách của bạn thường rõ ràng, trực tiếp và đầy quyết tâm, khiến nhiều người ngưỡng mộ nhưng đôi khi cũng thấy khó tiếp cận.",
        2: "Bạn mang đến cảm giác dịu dàng, ấm áp và dễ gần. Người khác thấy bạn là người dễ trò chuyện, biết lắng nghe và thấu hiểu. Bạn tạo ra không khí hòa bình và thoải mái xung quanh mình. Phong cách giao tiếp của bạn khéo léo, tế nhị và luôn cân nhắc cảm xúc người khác. Bạn thường được đánh giá là người đáng tin cậy và là bạn tốt.",
        3: "Bạn toát lên vẻ vui vẻ, sáng tạo và thu hút. Người khác cảm thấy thoải mái và vui vẻ khi ở bên bạn. Bạn có khả năng truyền tải năng lượng tích cực và làm cho không khí trở nên sôi động. Phong cách giao tiếp của bạn lôi cuốn, hài hước và đầy màu sắc. Bạn thường là tâm điểm của các cuộc trò chuyện và dễ dàng kết bạn.",
        4: "Bạn tạo ấn tượng là người đáng tin cậy, ổn định và thực tế. Người khác nhìn thấy bạn như một người có kỷ luật, có trách nhiệm và luôn giữ lời hứa. Bạn mang đến cảm giác an toàn và chắc chắn. Phong cách của bạn thường nghiêm túc, chuyên nghiệp và có tổ chức. Bạn được đánh giá cao về sự kiên định và khả năng hoàn thành công việc.",
        5: "Bạn mang vẻ năng động, tự do và đầy phiêu lưu. Người khác cảm nhận được sự linh hoạt và tinh thần cởi mở từ bạn. Bạn tạo ra không khí thú vị và không bao giờ nhàm chán. Phong cách của bạn đa dạng, thích thay đổi và luôn tìm kiếm điều mới mẻ. Bạn thường được xem là người thú vị và khó đoán.",
        6: "Bạn toát lên vẻ ấm áp, quan tâm và có trách nhiệm. Người khác cảm thấy được chăm sóc và bảo vệ khi ở bên bạn. Bạn mang đến năng lượng của sự hòa hợp và cân bằng. Phong cách của bạn thân thiện, chu đáo và luôn sẵn sàng giúp đỡ. Bạn thường được đánh giá là người có trái tim nhân hậu và đáng yêu.",
        7: "Bạn tạo ấn tượng là người trí tuệ, sâu sắc và bí ẩn. Người khác cảm nhận được sự thông thái và khả năng suy nghĩ độc lập từ bạn. Bạn mang vẻ tĩnh lặng nhưng đầy sức mạnh nội tại. Phong cách của bạn kín đáo, quan sát và có phần xa cách. Bạn thường được xem là người có chiều sâu và khó hiểu hết.",
        8: "Bạn toát lên khí chất của người thành đạt, mạnh mẽ và quyền lực. Người khác nhìn thấy bạn như một người có tầm ảnh hưởng và khả năng lãnh đạo. Bạn mang đến cảm giác chuyên nghiệp và đẳng cấp. Phong cách của bạn tự tin, quyết đoán và đầy tham vọng. Bạn thường được đánh giá cao về năng lực và sự thành công.",
        9: "Bạn mang vẻ nhân ái, thấu hiểu và bao dung. Người khác cảm nhận được lòng từ bi và sự quan tâm đến nhân loại từ bạn. Bạn tạo ra không khí cởi mở và chấp nhận. Phong cách của bạn ấm áp, khôn ngoan và đầy cảm xúc. Bạn thường được xem là người có tầm nhìn rộng và trái tim lớn."
      };
      return base + (details[num] || "Bạn có cách thể hiện bên ngoài độc đáo.");
    };

    const getBirthdayDescription = (num: number) => {
      const base = `Số Ngày Sinh ${num} tiết lộ tài năng đặc biệt và món quà mà bạn mang theo từ khi sinh ra. `;
      const details: Record<number, string> = {
        1: "Bạn sinh ra với khả năng lãnh đạo tự nhiên và tinh thần độc lập. Tài năng của bạn là khởi xướng ý tưởng mới, dám nghĩ dám làm và không ngại đi đầu. Bạn có khả năng tự tin vào bản thân và truyền cảm hứng cho người khác theo đuổi mục tiêu. Món quà của bạn là sự quyết tâm và lòng dũng cảm để vượt qua mọi trở ngại. Hãy sử dụng tài năng này để tạo ra những khởi đầu mới và dẫn dắt người khác đến thành công.",
        2: "Bạn được ban tặng khả năng ngoại giao và kết nối con người xuất sắc. Tài năng của bạn nằm ở việc hòa giải mâu thuẫn, tạo ra sự hài hòa và xây dựng mối quan hệ bền vững. Bạn có trực giác tốt về cảm xúc người khác và biết cách đối xử khéo léo trong mọi tình huống. Món quà của bạn là sự kiên nhẫn và khả năng hợp tác hiệu quả. Hãy dùng tài năng này để kết nối mọi người và tạo ra môi trường hòa bình.",
        3: "Bạn mang theo tài năng sáng tạo và giao tiếp từ khi sinh ra. Khả năng diễn đạt, truyền đạt ý tưởng và mang lại niềm vui cho người khác là điểm mạnh tự nhiên của bạn. Bạn có óc thẩm mỹ tốt và khả năng nghệ thuật trong nhiều lĩnh vực. Món quà của bạn là sự lạc quan và khả năng nhìn thấy vẻ đẹp trong cuộc sống. Hãy sử dụng tài năng này để truyền cảm hứng và mang lại nụ cười cho mọi người.",
        4: "Bạn sinh ra với khả năng xây dựng và tổ chức xuất sắc. Tài năng của bạn là biến ý tưởng thành hiện thực thông qua công việc chăm chỉ và kế hoạch chi tiết. Bạn có khả năng quản lý tốt và tạo ra nền tảng vững chắc cho mọi dự án. Món quà của bạn là sự kiên trì và tính thực tế. Hãy dùng tài năng này để xây dựng những thứ bền vững và đáng tin cậy.",
        5: "Bạn được trao tài năng linh hoạt và khả năng thích nghi nhanh. Sự tự do, khám phá và trải nghiệm mới là những gì bạn làm tốt nhất. Bạn có khả năng học hỏi nhanh và kết nối với nhiều người khác nhau. Món quà của bạn là tinh thần phiêu lưu và sự cởi mở. Hãy sử dụng tài năng này để khám phá thế giới và mang lại sự đa dạng cho cuộc sống.",
        6: "Bạn mang theo khả năng chăm sóc và tạo sự hài hòa tự nhiên. Tài năng của bạn là làm cho mọi người cảm thấy được yêu thương và an toàn. Bạn có khả năng cân bằng các mối quan hệ và tạo ra môi trường ấm cúng. Món quà của bạn là trái tim nhân hậu và khả năng hy sinh vì người khác. Hãy dùng tài năng này để nuôi dưỡng và bảo vệ những người bạn yêu thương.",
        7: "Bạn sinh ra với trí tuệ và khả năng phân tích sâu sắc. Tài năng của bạn là nghiên cứu, tìm hiểu và khám phá những điều bí ẩn. Bạn có khả năng suy nghĩ độc lập và đưa ra những phân tích chính xác. Món quà của bạn là sự thông thái và trực giác mạnh mẽ. Hãy sử dụng tài năng này để tìm kiếm chân lý và chia sẻ kiến thức với người khác.",
        8: "Bạn được ban tặng khả năng quản lý tài chính và xây dựng thành công vật chất. Tài năng của bạn là biến ý tưởng thành lợi nhuận và tạo ra giá trị thực tế. Bạn có khả năng nhìn xa trông rộng và tổ chức nguồn lực hiệu quả. Món quà của bạn là sự quyết đoán và khả năng lãnh đạo trong kinh doanh. Hãy dùng tài năng này để tạo ra sự thịnh vượng bền vững.",
        9: "Bạn mang theo tài năng phục vụ nhân loại và tạo ra sự thay đổi tích cực. Khả năng thấu hiểu, đồng cảm và kết nối với mọi người là điểm mạnh tự nhiên của bạn. Bạn có tầm nhìn rộng và mong muốn làm cho thế giới tốt đẹp hơn. Món quà của bạn là lòng từ bi và tinh thần vị tha. Hãy sử dụng tài năng này để góp phần làm thay đổi xã hội theo hướng tích cực."
      };
      return base + (details[num] || "Bạn có tài năng đặc biệt riêng.");
    };

    return (
      <div className="space-y-8">
        {/* Header with Premium Badge */}
        {isPremium && (
          <div className="flex justify-end">
            <PremiumBadge />
          </div>
        )}

        {/* AI Generated Content - MOVED TO TOP for prominence */}
        {(() => {
          const hasValidContent = content && content.trim().length > 0 && !content.includes('Không thể tạo phân tích');
          const displayContent = hasValidContent ? content : `Dựa trên phân tích thần số học chi tiết, con số Đường Đời ${numerologyData.lifePathNumber} của bạn cho thấy một hành trình cuộc sống đầy ý nghĩa. Bạn được sinh ra với những đặc điểm độc đáo và khả năng đặc biệt mà ít người có được.\n\nVề tính cách, sự kết hợp giữa Số Biểu Đạt ${numerologyData.expressionNumber} và Số Tính Cách ${numerologyData.personalityNumber} tạo nên một con người đa chiều. Bên ngoài, bạn thể hiện những phẩm chất nhất định, nhưng bên trong, Số Linh Hồn ${numerologyData.soulUrgeNumber} tiết lộ những khao khát sâu sắc hơn. Sự cân bằng giữa bề ngoài và nội tâm này là chìa khóa để bạn sống một cuộc đời trọn vẹn.\n\nTrong các mối quan hệ, bạn mang đến những giá trị độc đáo. Khả năng kết nối và thấu hiểu của bạn giúp xây dựng những mối quan hệ ý nghĩa. Tuy nhiên, cần lưu ý rằng mỗi mối quan hệ đòi hỏi sự cân bằng giữa cho và nhận, giữa độc lập và phụ thuộc.\n\nVề sự nghiệp, con số của bạn chỉ ra những lĩnh vực mà bạn có thể phát huy tối đa tiềm năng. Những công việc phù hợp không chỉ mang lại thu nhập mà còn giúp bạn cảm thấy có ý nghĩa và được thỏa mãn. Hãy tìm kiếm những cơ hội phù hợp với bản chất thật của bạn.\n\nCuối cùng, hành trình phát triển bản thân là một quá trình không ngừng nghỉ. Hãy chấp nhận cả điểm mạnh và điểm yếu của mình, học hỏi từ mọi trải nghiệm và luôn hướng tới phiên bản tốt nhất của chính mình. Con số của bạn là kim chỉ nam, nhưng quyết định cuối cùng vẫn nằm trong tay bạn.`;
          
          return (
            <div className="bg-[#1a1a1f]/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border-2 border-purple-500/30">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-linear-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center mr-4">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-[#fafafa]">
                  Phân Tích Tổng Quan Chi Tiết
                </h3>
              </div>
              <div className="prose prose-lg max-w-none text-[#d4d4d8] leading-relaxed space-y-4">
                {displayContent.split('\n\n').map((paragraph, idx) => (
                  <p key={idx} className="text-base leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          );
        })()}

        {/* Core Numbers */}
        <div className="bg-[#1a1a1f]/80 backdrop-blur-sm rounded-2xl p-6 border-2 border-purple-500/30">
          <h3 className="text-2xl font-bold text-[#fafafa] mb-6 text-center">
            <Hash className="w-5 h-5 inline-block mr-2" />
            Các Con Số Chính Của Bạn
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-2">
                {numerologyData.lifePathNumber}
              </div>
              <p className="text-sm font-medium text-[#d4d4d8]">Số Đường Đời</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-pink-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-2">
                {numerologyData.expressionNumber}
              </div>
              <p className="text-sm font-medium text-[#d4d4d8]">Số Biểu Đạt</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-2">
                {numerologyData.soulUrgeNumber}
              </div>
              <p className="text-sm font-medium text-[#d4d4d8]">Số Linh Hồn</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-2">
                {numerologyData.personalityNumber}
              </div>
              <p className="text-sm font-medium text-[#d4d4d8]">Số Tính Cách</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-2">
                {numerologyData.birthdayNumber}
              </div>
              <p className="text-sm font-medium text-[#d4d4d8]">Số Ngày Sinh</p>
            </div>
          </div>
        </div>

        {/* Detailed Analysis Sections */}
        <div className="space-y-6">
          {/* Life Path Number - Deep Analysis */}
          <div className="bg-[#1a1a1f]/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border-l-4 border-purple-600">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center text-xl font-bold mr-4">
                {numerologyData.lifePathNumber}
              </div>
              <h4 className="text-xl font-bold text-[#fafafa]">
                Số Đường Đời - Con Đường Cuộc Sống Của Bạn
              </h4>
            </div>
            <p className="text-[#d4d4d8] leading-relaxed text-base">
              {getLifePathDescription(numerologyData.lifePathNumber)}
            </p>
          </div>

          {/* Expression Number - Deep Analysis */}
          <div className="bg-[#1a1a1f]/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border-l-4 border-pink-600">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-pink-600 text-white rounded-full flex items-center justify-center text-xl font-bold mr-4">
                {numerologyData.expressionNumber}
              </div>
              <h4 className="text-xl font-bold text-[#fafafa]">
                Số Biểu Đạt - Tài Năng & Cách Thể Hiện
              </h4>
            </div>
            <p className="text-[#d4d4d8] leading-relaxed text-base">
              {getExpressionDescription(numerologyData.expressionNumber)}
            </p>
          </div>

          {/* Soul Urge Number - Deep Analysis */}
          <div className="bg-[#1a1a1f]/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border-l-4 border-blue-600">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mr-4">
                {numerologyData.soulUrgeNumber}
              </div>
              <h4 className="text-xl font-bold text-[#fafafa]">
                Số Linh Hồn - Khao Khát Nội Tâm
              </h4>
            </div>
            <p className="text-[#d4d4d8] leading-relaxed text-base">
              {getSoulUrgeDescription(numerologyData.soulUrgeNumber)}
            </p>
          </div>

          {/* Personality Number - Deep Analysis */}
          <div className="bg-[#1a1a1f]/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border-l-4 border-indigo-600">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-indigo-600 text-white rounded-full flex items-center justify-center text-xl font-bold mr-4">
                {numerologyData.personalityNumber}
              </div>
              <h4 className="text-xl font-bold text-[#fafafa]">
                Số Tính Cách - Ấn Tượng Đầu Tiên
              </h4>
            </div>
            <p className="text-[#d4d4d8] leading-relaxed text-base">
              {getPersonalityDescription(numerologyData.personalityNumber)}
            </p>
          </div>

          {/* Birthday Number - Deep Analysis */}
          <div className="bg-[#1a1a1f]/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border-l-4 border-purple-500">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-purple-500 text-white rounded-full flex items-center justify-center text-xl font-bold mr-4">
                {numerologyData.birthdayNumber}
              </div>
              <h4 className="text-xl font-bold text-[#fafafa]">
                Số Ngày Sinh - Tài Năng Đặc Biệt
              </h4>
            </div>
            <p className="text-[#d4d4d8] leading-relaxed text-base">
              {getBirthdayDescription(numerologyData.birthdayNumber)}
            </p>
          </div>
        </div>

        {/* Lucky Numbers & Colors - with descriptions */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-[#1a1a1f]/80 backdrop-blur-sm rounded-xl p-6 shadow-md border border-[#3f3f46]">
            <h4 className="text-lg font-bold text-[#fafafa] mb-4 flex items-center">
              <Target className="w-5 h-5 inline-block mr-2" />
              Số May Mắn
            </h4>
            <p className="text-sm text-[#a1a1aa] mb-4">
              Những con số này mang năng lượng tích cực, phù hợp với bạn. Sử dụng chúng trong các quyết định quan trọng, chọn ngày tháng, số điện thoại, hoặc số nhà để tăng may mắn.
            </p>
            <div className="flex flex-wrap gap-3">
              {numerologyData.luckyNumbers.map((num) => (
                <div
                  key={num}
                  className="w-12 h-12 bg-yellow-400 text-yellow-900 rounded-lg flex items-center justify-center text-xl font-bold shadow-md"
                >
                  {num}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#1a1a1f]/80 backdrop-blur-sm rounded-xl p-6 shadow-md border border-[#3f3f46]">
            <h4 className="text-lg font-bold text-[#fafafa] mb-4 flex items-center">
              <Palette className="w-5 h-5 inline-block mr-2" />
              Màu Sắc May Mắn
            </h4>
            <p className="text-sm text-[#a1a1aa] mb-4">
              Những màu sắc này hài hòa với năng lượng của bạn. Sử dụng chúng trong trang phục, trang trí không gian sống hoặc làm việc để tăng cường sức mạnh cá nhân.
            </p>
            <div className="flex flex-wrap gap-2">
              {numerologyData.luckyColors.map((color) => (
                <span
                  key={color}
                  className="px-4 py-2 bg-linear-to-r from-purple-100 to-pink-100 text-purple-900 rounded-full text-sm font-medium border border-purple-200"
                >
                  {color}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Strengths & Weaknesses */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-green-500/10 backdrop-blur-sm rounded-xl p-6 border border-green-500/30">
            <h4 className="text-lg font-bold text-green-400 mb-4 flex items-center">
              <Sparkles className="w-5 h-5 inline-block mr-2" />
              Điểm Mạnh
            </h4>
            <p className="text-sm text-[#d4d4d8] mb-4">
              Đây là những phẩm chất tự nhiên và tài năng bẩm sinh của bạn. Hãy tận dụng và phát triển những điểm mạnh này để đạt được thành công trong cuộc sống và sự nghiệp.
            </p>
            <ul className="space-y-2">
              {numerologyData.strengths.slice(0, 4).map((strength, index) => (
                <li key={index} className="flex items-start text-sm text-[#d4d4d8]">
                  <svg
                    className="w-5 h-5 text-green-400 mr-2 shrink-0 mt-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {strength}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-orange-500/10 backdrop-blur-sm rounded-xl p-6 border border-orange-500/30">
            <h4 className="text-lg font-bold text-orange-400 mb-4 flex items-center">
              <AlertTriangle className="w-5 h-5 inline-block mr-2" />
              Điểm Yếu Cần Cải Thiện
            </h4>
            <p className="text-sm text-[#d4d4d8] mb-4">
              Nhận thức về điểm yếu là bước đầu tiên để cải thiện. Không ai hoàn hảo, và việc làm việc với những khía cạnh này sẽ giúp bạn phát triển toàn diện hơn.
            </p>
            <ul className="space-y-2">
              {numerologyData.weaknesses.slice(0, 4).map((weakness, index) => (
                <li key={index} className="flex items-start text-sm text-[#d4d4d8]">
                  <svg
                    className="w-5 h-5 text-orange-400 mr-2 shrink-0 mt-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {weakness}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Career Suggestions */}
        <div className="bg-blue-500/10 backdrop-blur-sm rounded-xl p-6 border border-blue-500/30">
          <h4 className="text-lg font-bold text-blue-400 mb-4 flex items-center">
            <Briefcase className="w-5 h-5 inline-block mr-2" />
            Nghề Nghiệp Phù Hợp
          </h4>
          <p className="text-sm text-[#d4d4d8] mb-4">
            Dựa trên phân tích thần số học, những lĩnh vực nghề nghiệp này phù hợp với tính cách, tài năng và khao khát của bạn. Tuy nhiên, đừng giới hạn bản thân - thành công đến từ đam mê và nỗ lực.
          </p>
          <div className="flex flex-wrap gap-2">
            {numerologyData.career.map((job, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-blue-500/20 text-blue-300 rounded-lg text-sm font-medium border border-blue-500/30"
              >
                {job}
              </span>
            ))}
          </div>
        </div>



        {/* Premium CTA if not premium */}
        {!isPremium && (
          <div className="bg-linear-to-r from-yellow-500/10 to-orange-500/10 rounded-xl p-8 border-2 border-yellow-500/30 text-center">
            <h4 className="text-2xl font-bold text-[#fafafa] mb-3">
              <Star className="w-5 h-5 inline-block mr-2" fill="currentColor" />
              Muốn biết thêm về bản thân?
            </h4>
            <p className="text-[#d4d4d8] mb-6 max-w-2xl mx-auto">
              Nâng cấp lên <strong>Premium</strong> để nhận:
              <br />
              <CheckCircle className="w-4 h-4 inline-block mr-2 text-green-500" />
              Dự đoán chi tiết cho 12 tháng tới
              <br />
              <CheckCircle className="w-4 h-4 inline-block mr-2 text-green-500" />
              Phân tích tương thích với người khác
              <br />
              <CheckCircle className="w-4 h-4 inline-block mr-2 text-green-500" />
              Lời khuyên về thời điểm tốt để ra quyết định
              <br />
              <CheckCircle className="w-4 h-4 inline-block mr-2 text-green-500" />
              File PDF chuyên nghiệp để lưu trữ
            </p>
            <a
              href="/premium"
              className="inline-block px-8 py-4 bg-linear-to-r from-yellow-400 to-orange-500 text-white rounded-lg font-bold text-lg hover:from-yellow-500 hover:to-orange-600 transition-all transform hover:scale-105 shadow-xl"
            >
              Nâng Cấp Premium Ngay
            </a>
          </div>
        )}
      </div>
    );
  }

  // Horoscope Report (simplified version - similar structure)
  const horoscopeData = data as HoroscopeResult;

  return (
    <div className="space-y-8">
      {isPremium && (
        <div className="flex justify-end">
          <PremiumBadge />
        </div>
      )}

      {/* AI Content for Horoscope - Enhanced formatting with fallback */}
      {(() => {
        const hasValidContent = content && content.trim().length > 0 && !content.includes('Không thể tạo phân tích');
        const displayContent = hasValidContent ? content : `Dựa trên phân tích tử vi chi tiết của bạn, cung hoàng đạo ${horoscopeData.zodiacSign} kết hợp với con giáp ${horoscopeData.chineseZodiac} và ngũ hành ${horoscopeData.element} tạo nên một bản mệnh độc đáo và đầy tiềm năng.\n\n## BẢN MỆNH CỦA BẠN\n\nNgười sinh vào ${horoscopeData.zodiacSign} mang những đặc điểm tính cách rất riêng biệt. Sự kết hợp với con giáp ${horoscopeData.chineseZodiac} càng làm tăng thêm những nét đặc trưng trong cách bạn nhìn nhận và sống cuộc đời. Ngũ hành ${horoscopeData.element} chi phối bản mệnh của bạn ảnh hưởng sâu sắc đến tính cách, sức khỏe và hướng phát triển trong cuộc sống.\n\n## VẬN THẾ NĂM NAY\n\nNăm nay là một năm đầy biến động và cơ hội đối với bạn. Những tháng may mắn của bạn bao gồm ${horoscopeData.luckyPeriods.join(', ')}, đây là thời điểm tốt để bạn thực hiện những kế hoạch quan trọng, đưa ra quyết định lớn hoặc khởi đầu những dự án mới. Hãy tận dụng tối đa những giai đoạn thuận lợi này.\n\nTuy nhiên, bên cạnh những thời kỳ thuận lợi, bạn cũng cần cẩn trọng trong các tháng khác. Đừng vội vàng đưa ra quyết định quan trọng nếu không cảm thấy sẵn sàng. Sự kiên nhẫn và quan sát kỹ lưỡng sẽ giúp bạn tránh được nhiều rắc rối không đáng có.\n\n## TÌNH YÊU VÀ CÁC MỐI QUAN HỆ\n\nTrong các mối quan hệ, bạn mang những phẩm chất đặc biệt từ cung hoàng đạo của mình. Khả năng giao tiếp, sự thấu hiểu và cách bạn thể hiện tình cảm đều mang dấu ấn riêng của ${horoscopeData.zodiacSign}. Để có được hạnh phúc trong tình yêu, bạn cần học cách cân bằng giữa những gì bạn mong muốn và những gì người khác cần.\n\nCác mối quan hệ gia đình và bạn bè cũng đóng vai trò quan trọng trong cuộc sống của bạn. Hãy dành thời gian chăm sóc và nuôi dưỡng những mối quan hệ này, vì chúng sẽ là nguồn hỗ trợ vững chắc khi bạn cần.\n\n## SỰ NGHIỆP VÀ TÀI CHÍNH\n\nNgũ hành ${horoscopeData.element} chỉ ra những lĩnh vực nghề nghiệp mà bạn có thể phát huy tối đa năng lực. Những công việc liên quan đến ngũ hành này thường mang lại thành công và sự thỏa mãn cho bạn. Đừng ngại thử nghiệm và khám phá những cơ hội mới phù hợp với bản chất của mình.\n\nVề tài chính, năm nay mang đến cả cơ hội và thách thức. Hãy quản lý chi tiêu một cách thông minh, tiết kiệm cho tương lai nhưng cũng đừng quá kiệm lời đến mức ảnh hưởng đến chất lượng cuộc sống. Những khoản đầu tư nên được cân nhắc kỹ lưỡng, đặc biệt là trong những tháng không nằm trong danh sách may mắn của bạn.\n\n## SỨC KHỎE VÀ TINH THẦN\n\nSức khỏe là tài sản quý giá nhất. Dựa trên ngũ hành ${horoscopeData.element}, bạn cần đặc biệt chú ý đến một số bộ phận cơ thể nhất định. Chế độ ăn uống cân bằng, tập luyện đều đặn và nghỉ ngơi hợp lý sẽ giúp bạn duy trì sức khỏe tốt quanh năm.\n\nSức khỏe tinh thần cũng không kém phần quan trọng. Trong thời đại hiện đại đầy áp lực, hãy tìm cho mình những cách thức giải tỏa căng thẳng phù hợp. Thiền định, yoga, hoặc đơn giản là dành thời gian cho sở thích cá nhân đều có thể giúp bạn cân bằng tinh thần.\n\n## LỜI KHUYÊN PHÁT TRIỂN\n\nHành trình phát triển bản thân là một quá trình không ngừng nghỉ. Hãy đặt ra những mục tiêu rõ ràng và thực tế cho bản thân, sau đó kiên trì theo đuổi chúng. Đừng so sánh mình với người khác, mỗi người có một lộ trình riêng và thời điểm phát triển khác nhau.\n\nHọc cách chấp nhận cả thành công lẫn thất bại, vì cả hai đều là những bài học quý giá trong cuộc sống. Sự khiêm tốn khi thành công và sự kiên cường khi thất bại sẽ giúp bạn trưởng thành hơn mỗi ngày.\n\nCuối cùng, hãy tin tưởng vào trực giác của mình. Là người thuộc cung ${horoscopeData.zodiacSign}, bạn có những khả năng cảm nhận đặc biệt. Khi phải đối mặt với những quyết định khó khăn, hãy lắng nghe tiếng nói nội tâm - nó thường dẫn dắt bạn đến con đường đúng đắn.`;

        return (
          <div className="bg-[#1a1a1f]/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border-2 border-blue-500/30">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-linear-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center mr-4">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-[#fafafa]">
                Phân Tích Tử Vi Chi Tiết Toàn Diện
              </h3>
            </div>
            <div className="prose prose-lg max-w-none text-[#d4d4d8] leading-relaxed space-y-6">
              {displayContent.split('\n').map((line, idx) => {
                // Check if line is a section header (starts with ##)
                if (line.trim().startsWith('## ')) {
                  const title = line.replace(/^##\s+/, '').trim();
                  return (
                    <h4 key={idx} className="text-xl font-bold text-[#fafafa] mt-8 mb-4 pb-2 border-b-2 border-purple-500/30 flex items-center">
                      <Star className="w-5 h-5 mr-2 text-purple-400" fill="currentColor" />
                      {title}
                    </h4>
                  );
                }
                // Check if line is a subsection (starts with ###)
                if (line.trim().startsWith('### ')) {
                  const title = line.replace(/^###\s+/, '').trim();
                  return (
                    <h5 key={idx} className="text-lg font-semibold text-[#d4d4d8] mt-6 mb-3 flex items-center">
                      <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                      {title}
                    </h5>
                  );
                }
                // Check if line is a list item (starts with - or *)
                if (line.trim().match(/^[-*]\s+/)) {
                  const text = line.replace(/^[-*]\s+/, '').trim();
                  return (
                    <li key={idx} className="text-base leading-relaxed ml-6 flex items-start">
                      <span className="text-blue-400 mr-2 mt-1.5">•</span>
                      <span>{text}</span>
                    </li>
                  );
                }
                // Regular paragraph
                if (line.trim().length > 0) {
                  return (
                    <p key={idx} className="text-base leading-relaxed text-[#d4d4d8]">
                      {line}
                    </p>
                  );
                }
                // Empty line for spacing
                return <div key={idx} className="h-2"></div>;
              })}
            </div>
          </div>
        );
      })()}

      {/* Zodiac Info */}
      <div className="bg-[#1a1a1f]/80 backdrop-blur-sm rounded-2xl p-6 border-2 border-blue-500/30">
        <h3 className="text-2xl font-bold text-[#fafafa] mb-6 text-center">
          <Star className="w-5 h-5 inline-block mr-2" fill="currentColor" />
          Thông Tin Tử Vi Của Bạn
        </h3>
        <div className="grid md:grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-sm text-[#a1a1aa] mb-2">Cung Hoàng Đạo</p>
            <p className="text-xl font-bold text-[#fafafa]">{horoscopeData.zodiacSign}</p>
          </div>
          <div>
            <p className="text-sm text-[#a1a1aa] mb-2">Con Giáp</p>
            <p className="text-xl font-bold text-[#fafafa]">{horoscopeData.chineseZodiac}</p>
          </div>
          <div>
            <p className="text-sm text-[#a1a1aa] mb-2">Ngũ Hành</p>
            <p className="text-xl font-bold text-[#fafafa]">{horoscopeData.element}</p>
          </div>
        </div>
      </div>

      {/* Lucky Periods & Advice */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-[#1a1a1f]/80 backdrop-blur-sm rounded-xl p-6 shadow-md border border-[#3f3f46]">
          <h4 className="text-lg font-bold text-[#fafafa] mb-4 flex items-center"><Sparkles className="w-5 h-5 mr-2" /> Thời Kỳ May Mắn</h4>
          <ul className="space-y-2">
            {horoscopeData.luckyPeriods.map((period, index) => (
              <li key={index} className="text-sm text-[#d4d4d8] flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                {period}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-[#1a1a1f]/80 backdrop-blur-sm rounded-xl p-6 shadow-md border border-[#3f3f46]">
          <h4 className="text-lg font-bold text-[#fafafa] mb-4 flex items-center"><AlertTriangle className="w-5 h-5 mr-2" /> Thách Thức</h4>
          <ul className="space-y-2">
            {horoscopeData.challenges.map((challenge, index) => (
              <li key={index} className="text-sm text-[#d4d4d8] flex items-center">
                <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
                {challenge}
              </li>
            ))}
          </ul>
        </div>
      </div>



      {!isPremium && (
        <div className="bg-linear-to-r from-yellow-500/10 to-orange-500/10 rounded-xl p-8 border-2 border-yellow-500/30 text-center">
          <h4 className="text-2xl font-bold text-[#fafafa] mb-3">
            <Star className="w-5 h-5 inline-block mr-2" fill="currentColor" />
            Muốn biết tử vi cả năm?
          </h4>
          <p className="text-[#d4d4d8] mb-6">
            Nâng cấp Premium để nhận dự đoán chi tiết 12 tháng và file PDF chuyên nghiệp!
          </p>
          <a
            href="/premium"
            className="inline-block px-8 py-4 bg-linear-to-r from-yellow-400 to-orange-500 text-white rounded-lg font-bold text-lg hover:from-yellow-500 hover:to-orange-600 transition-all transform hover:scale-105 shadow-xl"
          >
            Nâng Cấp Premium Ngay
          </a>
        </div>
      )}
    </div>
  );
}
