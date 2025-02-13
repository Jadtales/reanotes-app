interface FoldersErrorHandling_inteface {
    isFolderLong: (folder: string) => string | null;
}

export const FoldersErrorHandling: FoldersErrorHandling_inteface = {
    isFolderLong: function (folder: string): string | null {
        if (folder.length > 20) {
            return 'Folder name must be less than 20 Characters'
        }

        return null
    }
}