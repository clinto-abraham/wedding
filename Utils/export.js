import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react'
import {
    CircularProgress,
    Card,
    CardHeader,
    CardMedia,
    CardContent,
    CardActions,
    Collapse,
    Avatar,
    IconButton,
    Paper,
    ImageList,
    ImageListItem,
    Container,
    Button,
    Grid,
    Typography,
    BottomNavigationAction,
    BottomNavigation,
    Icon,
    AppBar,
    Toolbar,
    Menu,
    Tooltip,
    MenuItem,
    Stack,
    Skeleton,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {
    ref,
    getDownloadURL,
    listAll,
    uploadBytes,
} from "firebase/storage";
import { useQuery } from '@tanstack/react-query'
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import AttachEmailIcon from '@mui/icons-material/AttachEmail';
import { styled } from '@mui/material/styles';
import { red } from '@mui/material/colors';
import { Box } from '@mui/system';
import MailLockIcon from '@mui/icons-material/MailLock';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import RestoreIcon from '@mui/icons-material/Restore';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LockPersonIcon from '@mui/icons-material/LockPerson';
import MenuIcon from '@mui/icons-material/Menu';
import ReplayIcon from '@mui/icons-material/Replay';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { createSlice } from "@reduxjs/toolkit"
import { v4 } from "uuid";
import { FileUploader } from "react-drag-drop-files";
import Image from 'next/image'
import { useSnackbar } from 'notistack';
// import { onAuthStateChanged } from "firebase/auth";

export {
    Link,
    useRouter,
    Image,
    useState,
    useEffect,
    Box,
    styled,
    red,
    v4,
    ReplayIcon, FormatQuoteIcon, PhoneAndroidIcon, AttachEmailIcon, MailLockIcon, ExpandMoreIcon, MoreVertIcon, FavoriteIcon, ShareIcon, RestoreIcon, LocationOnIcon, LockPersonIcon, MenuIcon, CloudUploadIcon,
    Button, Grid, Typography, ImageList, ImageListItem, Container, CircularProgress, Card, CardHeader, CardMedia, CardContent, CardActions, Collapse, Avatar, IconButton, Paper, BottomNavigationAction, BottomNavigation, AppBar, Toolbar, Menu, Tooltip, MenuItem, Stack, Skeleton,
    Icon,
    useDispatch,
    useSelector,
    ref, getDownloadURL, uploadBytes, listAll,
    createSlice,
    useQuery,
    FileUploader,
    useSnackbar,
}