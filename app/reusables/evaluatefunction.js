module.exports= (fu) => {
  switch (fu.type) {
    case 'deadline':
      let currentTime = 1500 //FIXME: add actual time format
      let opID
      if(fu.config.deadline>currentTime) {
        opID = 0
      } else {opID = 1}
      return {op: fu.result[opID], opID}
      break;
    default:
      throw(fu.type + 'is not a valid function')
  }
}
