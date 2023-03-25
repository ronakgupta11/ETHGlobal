export function FETCH_CREATED_COURSE() {
    return `query {
        courseCreateds(orderBy: id) {
            id
            courseId
            price
            name
            description
            imageUrl
            videoUrl
          }
      }`;
  }

  export function FETCH_COURCE_PURCHASE(){
    return `query {
        coursePurchases(orderBy: id) {
            id
            buyer
            courseId
          }
      }`;
  }