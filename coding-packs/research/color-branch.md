 Chi tiết từ Tailwind Config

  // Màu chính (Primary)
  primary: {
    DEFAULT: '#006672',  // Teal - màu default
    600: '#006672',       // Teal - used as hover
    700: '#00707e',
    800: '#005560',       // Dark teal - thường dùng cho 
  hover
  }

  // Brand colors  brand: {
    teal: '#006672',       // Màu teal chính thức
    darkTeal: '#005560',    // Màu hover/dark version
    accent: '#F47F35',     // Màu cam (accent)
  }
  // Teal aliases
  teal: {    DEFAULT: '#006672',
    dark: '#005560',
    light: '#F0F9FA',
    text: '#006672',
  }


bg-[#008B9C] 
hover:bg-[#00707e]
#E91E63

  Cách sử dụng trong code

  // Hover color cho link
  <a className="text-gray-500 hover:text-teal-text">Link</a>
  // → Khi hover: #006672

  // Hover color cho button
  <button className="bg-[#006672] hover:bg-[#005560]
  text-white">Button</button>
  // → Khi hover: #005560

  Tóm tắt: Màu hover mặc định là #005560 (dark teal), màu
  chính là #006672.