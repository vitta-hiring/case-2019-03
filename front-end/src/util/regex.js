export default class {
  constructor() {}

  static replacer(tpl, data) {
    let match = "EMPTY";
    var re = new RegExp("\\$\\(([^\\)]+)?\\)", "g");
    do {
      match = re.exec(tpl);
      if (match) {
        tpl = tpl.replace(match[0], data[match[1]]);
      }
      re.lastIndex = 0;
    } while (match);

    return tpl;
  }

}
