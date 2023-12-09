export function getFormattedDate(timestamp) {
    if (!timestamp) {
      return "";
    }
  
    const dateObject = new Date(timestamp);
  
    if (isNaN(dateObject.getTime())) {
      return "";
    }
  
    const year = dateObject.getFullYear();
    const month = dateObject.getMonth() + 1; 
    const day = dateObject.getDate();
  
    return `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
  }
  