/* eslint-disable linebreak-style */
import React from 'react';
import PropTypes from 'prop-types';
import styles from './Post.module.scss';
import clsx from 'clsx';

import { connect } from 'react-redux';
import { getAll, getOnePost } from '../../../redux/postsRedux';

import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import Grid from '@material-ui/core/Grid';
import LocalPhoneIcon from '@material-ui/icons/LocalPhone';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Link from '@material-ui/core/Link';
import EditIcon from '@material-ui/icons/Edit';

const Component = ({ className, post }) => {
  return (
    <div className={clsx(className, styles.root)}>
      <Grid container spacing={3} className={styles.postContainer}>
        <Grid item xs={12} sm={5} md={6}>
          <img className={styles.postImage} src={post.image} alt='img' />
        </Grid>
        <Grid item xs={12} sm={7} md={6} className={styles.content}>
          <div className={styles.titleWrapper}>
            <Typography
              gutterBottom
              variant='h5'
              component='h2'
              className={styles.title}
            >
              {post.title}
            </Typography>
            <Typography className={styles.postStatus}>{post.status}</Typography>
            <Link href={`/post/${post.id}/edit`} className={styles.postEdit}>
              <Typography className={styles.editContent}>Edit</Typography>
              <EditIcon className={styles.editIcon} />
            </Link>
          </div>
          <Typography
            variant='body2'
            color='textSecondary'
            component='p'
            className={styles.postDescription}
          >
            {post.content}
          </Typography>

          <div className={styles.postContact}>
            <LocalOfferIcon className={styles.contactIcon} />
            <Typography variant='body2' component='p' className={styles.author}>
              {post.price} $
            </Typography>
          </div>

          <div className={styles.postContact}>
            <MailOutlineIcon className={styles.contactIcon} />
            <Typography variant='body2' component='p' className={styles.author}>
              {post.email}
            </Typography>
          </div>

          <div className={styles.postContact}>
            <LocalPhoneIcon className={styles.contactIcon} />
            <Typography variant='body2' component='p' className={styles.author}>
              {post.phone}
            </Typography>
          </div>

          <div className={styles.postContact}>
            <LocationOnIcon className={styles.contactIcon} />
            <Typography variant='body2' component='p' className={styles.author}>
              {post.location}
            </Typography>
          </div>

          <div className={styles.icons}>
            <IconButton aria-label='add to favorites'>
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label='share'>
              <ShareIcon />
            </IconButton>
          </div>

          <div className={styles.date}>
            <Typography variant='body2' color='textSecondary' component='p'>
              Publication: {post.datePublication}
            </Typography>
            <Typography variant='body2' color='textSecondary' component='p'>
              Updated: {post.dateLastUpdate}
            </Typography>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

Component.propTypes = {
  className: PropTypes.string,
  params: PropTypes.object,
  post: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      content: PropTypes.string,
      datePublication: PropTypes.string,
      dateLastUpdate: PropTypes.string,
      email: PropTypes.string,
      status: PropTypes.string,
      image: PropTypes.any,
      price: PropTypes.number,
      phone: PropTypes.string,
      location: PropTypes.string,
    })
  ),
};

const mapStateToProps = (state, props) => ({
  postsAll: getAll(state),
  post: getOnePost(state, props.match.params.id),
});

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

const Container = connect(mapStateToProps)(Component);

export {
  // Component as Post,
  Container as Post,
  Component as PostComponent,
};
