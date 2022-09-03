const defaultNumbers =' hai ba bốn năm sáu bảy tám chín';

const chuHangDonVi = ('1 một' + defaultNumbers).split(' ');
const chuHangChuc = ('lẻ mười' + defaultNumbers).split(' ');
const chuHangTram = ('không một' + defaultNumbers).split(' ');

function convert_block_three(number) {
  // eslint-disable-next-line
  if(number == '000') return '';
  var _a = number + ''; //Convert biến 'number' thành kiểu string

  //Kiểm tra độ dài của khối
  // eslint-disable-next-line
  switch (_a.length) {
    case 0: return '';
    case 1: return chuHangDonVi[_a];
    case 2: return convert_block_two(_a);
    case 3: 
      var chuc_dv = '';
      // eslint-disable-next-line
      if (_a.slice(1,3) != '00') {
        chuc_dv = convert_block_two(_a.slice(1,3));
      }
      var tram = chuHangTram[_a[0]] + ' trăm';
      return tram + ' ' + chuc_dv;
  }
}

function convert_block_two(number) {
  var dv = chuHangDonVi[number[1]];
  var chuc = chuHangChuc[number[0]];
  var append = '';

  // Nếu chữ số hàng đơn vị là 5
  // eslint-disable-next-line
  if (number[0] > 0 && number[1] == 5) {
    dv = 'lăm'
  }

  // Nếu số hàng chục lớn hơn 1
  if (number[0] > 1) {
    append = ' mươi';
    
  // eslint-disable-next-line
    if (number[1] == 1) {
      dv = ' mốt';
    }
  }

  return chuc + '' + append + ' ' + dv; 
}

const dvBlock = '1 nghìn triệu tỷ'.split(' ');

function to_vietnamese(number) {
  var str = parseInt(number) + '';
  var i = 0;
  var arr = [];
  var index = str.length;
  var result = [];
  var rsString = '';

  // eslint-disable-next-line
  if (index == 0 || str == 'NaN') {
    return '';
  }

  // Chia chuỗi số thành một mảng từng khối có 3 chữ số
  while (index >= 0) {
    arr.push(str.substring(index, Math.max(index - 3, 0)));
    index -= 3;
  }

  // Lặp từng khối trong mảng trên và convert từng khối đấy ra chữ Việt Nam
  for (i = arr.length - 1; i >= 0; i--) {
    // eslint-disable-next-line
    if (arr[i] != '' && arr[i] != '000') {
      result.push(convert_block_three(arr[i]));

      // Thêm đuôi của mỗi khối
      if (dvBlock[i]) {
        result.push(dvBlock[i]);
      }
    }
  }

  // Join mảng kết quả lại thành chuỗi string
  rsString = result.join(' ');

  // Trả về kết quả kèm xóa những ký tự thừa
  return rsString.replace(/[0-9]/g, '').replace(/ /g,' ').replace(/ $/,'');
}

const moneyToText = (number) => {
  if (!number) {
    return "Không"
  }
  const mySentence = to_vietnamese(number);
  let words = mySentence.split(" ");
  for (let i = 0; i < words.length; i++) {
    if (!words[i]) {
      continue
    }
    words[i] = words[i][0].toUpperCase() + words[i].slice(1) + " ";
  }
  words.push(" Đồng")
  return words
}

const splitMoney = (value) => `${value} VNĐ`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')

export { moneyToText, splitMoney}