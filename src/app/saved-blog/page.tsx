"use server";

import SavedBlogList from "@/components/saved-blog/saved-blog-list.component";
import { Paper } from "@mui/material";

export default async function SavedBlogPage() {
    return (
        <Paper sx={{ paddingX: 20, paddingY: 5 }}>
            <SavedBlogList />
        </Paper>
    );
}
