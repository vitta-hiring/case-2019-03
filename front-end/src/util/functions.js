export default class {

  static formatConvertStrDate(aDate) {
    if (aDate) {
      let typeDate = new Date(aDate);
      let mes = typeDate.getMonth() < 10 ? '0' + String(typeDate.getMonth() + 1) : String(typeDate.getMonth());
      let dia = typeDate.getDate() < 10 ? '0' + String(typeDate.getDate()) : String(typeDate.getDate());
      return String(typeDate.getFullYear()) + '-' + mes + '-' + dia;
    } else {
      return '';
    }
  }

  static formatDateEN(data) {
    let parts = data.split('/');
    let novadata = parts[2] + "/" +parts[1]+"/"+parts[0];
    
    return novadata;
  }

}
