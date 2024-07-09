import qs from 'query-string'


export type UrlQueryParams = {
    params: string
    key: string
    value: string | null
  }
  
  export type RemoveUrlQueryParams = {
    params: string
    keysToRemove: string[]
  }
  
  

export const calculateTimeDifference = (date: number|Date) => {
    const currentDate = new Date().getTime();
    const dateTime = new Date(date).getTime();
    const difference = currentDate - dateTime;

    // Calculate time difference in minutes
    const minutesDifference = Math.floor(difference / (1000 * 60));
    // If difference is less than 0 minutes, show in minutes
    if (minutesDifference === 0) {
        return `just now`;
    }
    // If difference is less than 60 minutes, show in minutes
    if (minutesDifference < 60) {
        return `${minutesDifference} min ago`;
    }

    // If difference is less than 24 hours, show in hours
    const hoursDifference = Math.floor(minutesDifference / 60);
    if (hoursDifference < 24) {
        return `${hoursDifference} hr ago`;
    }

    // Otherwise, show in days
    const daysDifference = Math.floor(hoursDifference / 24);
    if (daysDifference < 7) {
        return `${daysDifference}d ago`;
    }
    // Otherwise, show in weeks

    const weekDifference = Math.floor(daysDifference / 7);
    if (weekDifference < 4) {
        return `${weekDifference}w ago`;
    }

    const monthDifference = Math.floor(weekDifference / 4);
    return `${monthDifference} mth ago`;
}

export function formUrlQuery({ params, key, value }: UrlQueryParams) {
    const currentUrl = qs.parse(params)
  
    currentUrl[key] = value
  
    return qs.stringifyUrl(
      {
        url: window.location.pathname,
        query: currentUrl,
      },
      { skipNull: true }
    )
  }
  
  export function removeKeysFromQuery({ params, keysToRemove }: RemoveUrlQueryParams) {
    const currentUrl = qs.parse(params)
  
    keysToRemove.forEach(key => {
      delete currentUrl[key]
    })
  
    return qs.stringifyUrl(
      {
        url: window.location.pathname,
        query: currentUrl,
      },
      { skipNull: true }
    )
  }