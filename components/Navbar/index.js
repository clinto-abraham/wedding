import {
    Link,
    useRouter,
    useDispatch, useSelector,
    useState, useEffect,
    Icon, AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Avatar, Button, Tooltip, MenuItem,
    MenuIcon, LockPersonIcon,
} from '@/Utils/export'

import SignIn from '../SignIn';
import { signOutUser } from '@/Utils/firebase';
import { registerUser } from '@/redux/loginSlice';
import { initialLocalState } from '@/Utils/userInitialData';
import { registerRendering } from '@/redux/utilsSlice';
import Logo from '../Logo';
const UserNavList = ['profile', 'message', 'logout', 'upload'];

const TopNavbar = () => {
    const router = useRouter()
    const dispatch = useDispatch()
    const { photoTilesTypes } = useSelector(state => state.uploads)
    const { render } = useSelector(state => state.utils)
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const { user } = useSelector(state => state.user)

    console.log(render, 're-rendering of navbar')

    useEffect(() => {
        dispatch(registerRendering(render + 1))
    }, [])

    const handlePageNavigation = page => {
        router.push(page)
    };

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorElUser(null);
    };

    const handleDropDownSelect = (page) => {
        if (page === 'logout') {
            signOutUser()
            dispatch(registerUser(initialLocalState.user))
            router.push('/')
        } else if (page === 'upload') {
            if (user?.email === ('clinto92@gmail.com' || 'chippynt@gmail.com')) router.push(page)
        } else if (page === 'message') {
            if (!user?.isAnonymous) router.push(page)
        } else if (page === 'profile') {
            if (!user?.isAnonymous) router.push(page)
        }
        setAnchorElUser(null);
    }

    const handleOpenNav = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNav = () => {
        setAnchorElNav(null);
    };

    const handleNavSelect = (page) => {
        router.push(page)
        setAnchorElNav(null);
    }

    return (
        <AppBar position='static' color='transparent' sx={{ padding: '1rem', margin: '2rem 0rem' }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>

                    <Typography
                        variant="h2"
                        noWrap
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.5rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        <Link href='/'>
                            Clinto & Chippy
                        </Link>

                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNav}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>

                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNav}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {photoTilesTypes.map((page) => (
                                <MenuItem
                                    key={page}
                                    onClick={() => handleNavSelect(page)}>
                                    <Typography textAlign="center">
                                        <Link href={page}>{page.toUpperCase()}</Link>
                                    </Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <Link href='/'>
                        <Logo />
                    </Link>


                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {photoTilesTypes.map((page) => (
                            <Button
                                key={page}
                                onClick={() => handlePageNavigation(page)}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                {page}
                            </Button>
                        ))}
                    </Box>

                    <Box sx={{ flexGrow: 1.5, margin: '0rem 1rem' }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar
                                    alt={user?.displayName || 'Clinto'}
                                    src={user?.photoURL}
                                />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleClose}
                        >
                            <MenuItem>
                                <SignIn />
                            </MenuItem>
                            {UserNavList.map(list => (
                                <MenuItem key={list}>
                                    <Button onClick={() => handleDropDownSelect(list)}>
                                        {list.toUpperCase()}
                                        {!user || user?.isAnonymous ? (
                                            <Icon color='secondary'>
                                                <LockPersonIcon />
                                            </Icon>
                                        ) : null}
                                    </Button>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default TopNavbar;

// import * as React from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { Icon, AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Avatar, Button, Tooltip, MenuItem } from '@mui/material';
// import MenuIcon from '@mui/icons-material/Menu';
// import LockPersonIcon from '@mui/icons-material/LockPerson';
// import Link from 'next/link'
// import { useRouter } from 'next/router';
