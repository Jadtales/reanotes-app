'use server'
import {ReactElement} from "react";
import PageLoader from "@/app/compos/data-ui-loader/PageLoader";

export default async function loadingPage(): Promise<ReactElement>{
    return <PageLoader/>
}