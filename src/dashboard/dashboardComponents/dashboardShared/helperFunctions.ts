export function getCorrectDate(date: string) {
    const correctDate = new Date(date).toDateString().replace((new Date(date).toDateString().split(" ").shift()), "")
    return correctDate;
}

export function getCorrectItemsNumber(page:string,limit:string){
    const correctNumber = (Number(page || 1) * Number(limit || 9) - Number(limit || 9));
    return correctNumber;
}

export const defaultUserImage = "https://res.cloudinary.com/doxhxgz2g/image/upload/f_auto,q_auto/v1/eCommerce-React-app/UsersImages/rtnfqs2mx3rvvgleayna"
