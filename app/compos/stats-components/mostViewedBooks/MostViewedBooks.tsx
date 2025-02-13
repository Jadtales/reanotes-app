import {ReactElement} from "react";
import Image from "next/image";

interface ComponentInterface {
    imgUrl: string;
    bookTitle: string;
}

export default function MostViewedBooks({imgUrl, bookTitle}: ComponentInterface): ReactElement<any> {
    return <div className={'mostViewedBooksContainer'}>
        <Image src={imgUrl} alt={'book'} width={100}/>
        <h4>{bookTitle}</h4>
    </div>
}