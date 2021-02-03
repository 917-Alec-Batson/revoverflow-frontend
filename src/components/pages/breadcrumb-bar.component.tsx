import React from 'react';
import { Link, createStyles, makeStyles, Theme, Toolbar } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { useHistory } from 'react-router';

/**
 * @file places breadcrume bar under the navbar with clickable trail
 * @author Keith Salzman
 */

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        link: {
            display: 'flex',
            color: "#ffffff"
        },
        icon: {
            marginRight: theme.spacing(0.5),
            width: 20,
            height: 20,
        },
        BCtoolbar: {
            backgroundColor: "#474c55",
            paddingLeft: 80,
            marginTop: 60,
            marginLeft: 20,
            display: "flex",
            flexGrow: 1
            
        }
    }),
);

export const BreadcrumbBarComponent: React.FC = (props) => {
    const classes = useStyles();
    const history = useHistory();
    const pathname = (window.location.pathname).substring(1);

    // function refreshPage() {
    //     window.location.reload(false);
    // }

    function handleClick(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
        history.push("/" + pathname);
        // refreshPage();
    }

    function handleClick2(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
        history.push("/feed");
        // refreshPage();
    }

    return (
        <Toolbar className={classes.BCtoolbar}>
            <Link color="inherit" href="/feed" onClick={handleClick2} className={classes.link}>
                <HomeIcon className={classes.icon} />
            </Link>
            <ArrowForwardIosIcon className={classes.link} />
            <Link
                color="inherit"
                href={pathname}
                onClick={handleClick}
                className={classes.link}
            >
                {pathname}
            </Link>
        </Toolbar>
    );
}