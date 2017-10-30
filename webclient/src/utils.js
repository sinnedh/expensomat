function formatDate(datetime) {
  return datetime.substr(0, 10)
}

function getFormFieldValue(target, name) {
  if (target.type === 'checkbox') {
    return target.checked;
  }

  if (target.type === 'select-multiple') {
    // TODO refactor with .map()
    let value = [];
    for (var i = 0, l = target.options.length; i < l; i++) {
      if (target.options[i].selected) {
        value.push(parseInt(target.options[i].value, 10));
      }
    }
    return value;
  }

  return target.value;
}

export { formatDate, getFormFieldValue }
