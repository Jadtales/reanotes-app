import Link from "next/link";
import React, {Fragment, ReactElement, useContext, useState} from "react";
import DeleteFolderElementButton from "@/app/compos/utility-components/delete-element-button/delete-folder-element-button";
import FoldersStateManagerContext from "@/app/wide-state-management/FoldersState";
import {usePathname, useRouter, useSearchParams} from "next/navigation";

interface ComponentProps {
    folder: string

}

export default function FolderElement({folder}: ComponentProps): ReactElement<HTMLDivElement> {
    const [isFolderHovered, setIsFolderHovered] = useState<boolean>(false);


    // todo: handle folder deletion in the db
    const handleFolderDeletionClick = (isClicked: boolean = false, folder: string) => {
    }


    const router = useRouter();
    const pathname = usePathname();

    const currentFolderUrl = decodeURIComponent(pathname.split("/").at(-1)!);

    const handleCurrentOpenFolder = (folder: string): void => {
        router.push(`/home/${folder.replaceAll(' ', '-')}`);
    };


    return <div onMouseEnter={() => folder !== 'all' && setIsFolderHovered(true)}
                onMouseLeave={() => setIsFolderHovered(false)}
                className={currentFolderUrl === folder ?
                    'link-element-container-active' : 'link-element-container'}
    >
        <Link href={`/home/${folder}`}
              onClick={() => handleCurrentOpenFolder(folder)}>
            #{folder.charAt(0).toUpperCase() + folder.slice(1)}
        </Link>
        {isFolderHovered && folder !== 'all' &&
            <DeleteFolderElementButton isDeletionButtonClicked={handleFolderDeletionClick} folderName={folder}/>}
    </div>
}