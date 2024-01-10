export const convertDate = (date: string): string => {
    const dateData = new Date(date);
    const options: Intl.DateTimeFormatOptions = { 
      year: "numeric", 
      month: "long", 
      day: "numeric", 
      hour: "2-digit", 
      minute:"2-digit", 
      second: "2-digit" 
    };
    return new Intl.DateTimeFormat("tr-TR", options).format(dateData);
  };