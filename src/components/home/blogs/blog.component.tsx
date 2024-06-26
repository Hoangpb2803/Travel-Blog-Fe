"use client";

import { useEffect, useMemo, useState } from "react";
import {
    Avatar,
    Box,
    Divider,
    IconButton,
    Link,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Paper,
    Stack,
    Tooltip,
    Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import SmsIcon from "@mui/icons-material/Sms";
import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
import BookmarkAddedOutlinedIcon from "@mui/icons-material/BookmarkAddedOutlined";

import BlogComment from "./blog-comment.component";
import ImageSlider from "@/components/images-slide.component";
import ImageShow from "@/components/image-show.component";
import { I_Blog } from "@/interfaces/blog.interface";
import moment from "moment";
import { useRouter } from "next/navigation";

const StackReaction = styled(Stack)(({ theme }) => ({
    padding: `${theme.spacing(0.8)} ${theme.spacing(4)}`,
    "&:hover": {
        backgroundColor: "rgba(0, 0, 0, 0.1)",
        borderRadius: 5,
        cursor: "pointer",
    },
}));

export default function Blog({ blog }: { blog: I_Blog }) {
    const router = useRouter();

    const [isLike, setIsLike] = useState<boolean>(false);
    const [likeNumber, setLikeNumber] = useState<number>(1);
    const [openSLide, setOpenSlide] = useState<boolean>(false);
    const [imageIndex, setImageIndex] = useState<number>(0);

    const isSaved = useMemo(() => {
        return blog.isSaved;
    }, [blog.isSaved]);

    const timeAgo = useMemo(() => {
        const createdTime = new Date(blog.createdAt);
        return moment(createdTime).fromNow();
    }, [blog.createdAt]);

    const handleCloseSlide = () => setOpenSlide(false);
    const handleOpenSlide = (index: number) => {
        setOpenSlide(true);
        setImageIndex(index);
    };

    const onClickProfile = () => {
        if (blog.user._id) {
            router.push(`/profile/${blog.user._id}`);
        }
    };

    return (
        <Paper sx={{ paddingTop: 1, paddingX: 1 }}>
            {/* name */}
            <Box display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
                <ListItem>
                    <ListItemAvatar sx={{ cursor: "pointer" }} onClick={onClickProfile}>
                        <Avatar src={blog.user.avatar && blog.user.avatar} />
                    </ListItemAvatar>
                    <ListItemText
                        onClick={onClickProfile}
                        sx={{ cursor: "pointer" }}
                        primary={
                            blog.user.firstName &&
                            blog.user.lastName &&
                            `${blog.user.lastName} ${blog.user.firstName}`
                        }
                        secondary={timeAgo}
                    />
                </ListItem>
                <Tooltip title={!isSaved ? "lưu blog" : "đã lưu"}>
                    <Box component={"span"}>
                        <IconButton disabled={isSaved}>
                            {isSaved ? (
                                <BookmarkAddedOutlinedIcon />
                            ) : (
                                <BookmarkAddOutlinedIcon />
                            )}
                        </IconButton>
                    </Box>
                </Tooltip>
            </Box>
            {/* main content */}
            <Stack spacing={1}>
                <Box>
                    <Typography component={"span"} fontWeight={600} marginRight={1}>
                        Địa điểm du lịch:
                    </Typography>
                    <Typography component={"span"} textAlign={"justify"}>
                        {blog.address && blog.address}
                    </Typography>
                </Box>
                <Box>
                    <Typography component={"span"} fontWeight={600} marginRight={1}>
                        Quốc gia:
                    </Typography>
                    <Typography component={"span"} textAlign={"justify"}>
                        {blog.country && blog.country}
                    </Typography>
                </Box>
                <Box>
                    <Typography component={"span"} fontWeight={600} marginRight={1}>
                        Thành phố:
                    </Typography>
                    <Typography component={"span"} textAlign={"justify"}>
                        {blog.city && blog.city}
                    </Typography>
                </Box>
                <Box>
                    <Typography component={"span"} fontWeight={600} marginRight={1}>
                        Nội dung nhận xét:
                    </Typography>
                    <Typography component={"span"} textAlign={"justify"}>
                        {blog.content && blog.content}
                    </Typography>
                </Box>
            </Stack>
            {/* show images */}
            <ImageShow
                images={blog.images ? blog.images : []}
                handleOpenSlide={handleOpenSlide}
            />
            {/* show reaction */}
            <Box paddingX={1} sx={{ color: "rgba(0, 0, 0, 0.7)" }}>
                <Box
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                    paddingY={2}
                >
                    <Stack direction={"row"} spacing={0.5} sx={{ cursor: "pointer" }}>
                        {isLike ? (
                            <ThumbUpAltIcon color="primary" />
                        ) : (
                            <ThumbUpOffAltIcon />
                        )}
                        <Typography>{likeNumber}</Typography>
                    </Stack>

                    <Link
                        sx={{
                            cursor: "pointer",
                            color: "rgba(0, 0, 0, 0.7)",
                            textDecoration: "none",
                            "&:hover": { textDecoration: "underline" },
                        }}
                    >
                        5 bình luận
                    </Link>
                </Box>

                <Divider />

                <Box
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"space-evenly"}
                    paddingY={1}
                >
                    <StackReaction
                        direction={"row"}
                        spacing={1}
                        onClick={() => {
                            setIsLike(!isLike);
                            !isLike
                                ? setLikeNumber((prev) => prev + 1)
                                : setLikeNumber((prev) => prev - 1);
                        }}
                    >
                        {isLike ? (
                            <ThumbUpAltIcon color="primary" />
                        ) : (
                            <ThumbUpOffAltIcon />
                        )}
                        <Typography>Thích</Typography>
                    </StackReaction>

                    <StackReaction direction={"row"} spacing={1}>
                        <SmsIcon />
                        <Typography>Bình luận</Typography>
                    </StackReaction>
                </Box>

                <Divider />

                <BlogComment />
            </Box>

            {/* show image slide when user click to an image of blog */}
            {openSLide && (
                <ImageSlider
                    images={blog.images ? blog.images : []}
                    imageIndex={imageIndex}
                    handleCloseSlide={handleCloseSlide}
                />
            )}
        </Paper>
    );
}
