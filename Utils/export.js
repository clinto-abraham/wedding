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
    CardActionArea,
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
    ImageListItemBar,
    Chip,
    Checkbox,
    Select,
    ListItemText,
    FormControl,
    InputLabel,
    OutlinedInput,
    LinearProgress,
} from '@mui/material';

import { useDispatch, useSelector } from 'react-redux';
import {
    ref,
    getDownloadURL,
    listAll,
    uploadBytes,
    getStorage,
    deleteObject,
    uploadBytesResumable
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
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import { createSlice } from "@reduxjs/toolkit"
import { v4 } from "uuid";
import { FileUploader } from "react-drag-drop-files";
import Image from 'next/image'
import { useSnackbar } from 'notistack';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import VpnKeyOffIcon from '@mui/icons-material/VpnKeyOff';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import GavelIcon from '@mui/icons-material/Gavel';
import PolicyIcon from '@mui/icons-material/Policy';
import StarsIcon from '@mui/icons-material/Stars';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import LayersIcon from '@mui/icons-material/Layers';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import CommentIcon from '@mui/icons-material/Comment';
import YouTube from "react-youtube";
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import PhotoSizeSelectSmallIcon from '@mui/icons-material/PhotoSizeSelectSmall';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import PhotoSizeSelectLargeIcon from '@mui/icons-material/PhotoSizeSelectLarge';
import HomeIcon from '@mui/icons-material/Home';
import { WhatsappShareButton } from 'next-share'
import PropTypes from 'prop-types';
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
    ReplayIcon, FormatQuoteIcon, PhoneAndroidIcon, AttachEmailIcon, MailLockIcon, ExpandMoreIcon, MoreVertIcon, FavoriteIcon, ShareIcon, RestoreIcon, LocationOnIcon, LockPersonIcon, MenuIcon, CloudUploadIcon, ArrowForwardIosIcon, ArrowBackIosNewIcon, DeleteSweepIcon, VpnKeyOffIcon, GitHubIcon, LinkedInIcon, TwitterIcon, LightbulbIcon, GavelIcon, PolicyIcon, StarsIcon, AccountTreeIcon, LayersIcon, ThumbUpIcon, CommentIcon,PhotoSizeSelectLargeIcon,ZoomInIcon,PhotoSizeSelectSmallIcon,ZoomOutIcon, HomeIcon,
    YouTube,
    WhatsappShareButton,
    Button, Grid, Typography, ImageList, ImageListItem, Container, CircularProgress, Card, CardHeader, CardMedia, CardContent, CardActions, Collapse, Avatar, IconButton, Paper, BottomNavigationAction, BottomNavigation, AppBar, Toolbar, Menu, Tooltip, MenuItem, Stack, Skeleton, ImageListItemBar, Chip, Checkbox, Select, ListItemText, FormControl, InputLabel, OutlinedInput, LinearProgress, CardActionArea,
    Icon,
    useDispatch,
    useSelector,
    ref, getDownloadURL, uploadBytes, listAll, getStorage, deleteObject, uploadBytesResumable,
    createSlice,
    useQuery,
    FileUploader,
    useSnackbar,
    PropTypes,
}