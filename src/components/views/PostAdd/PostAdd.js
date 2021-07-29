/* eslint-disable linebreak-style */
import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import styles from './PostAdd.module.scss';
import { connect } from 'react-redux';
import { getStatus } from '../../../redux/userSwitcherRedux.js';
import { fetchAddPost } from '../../../redux/postsRedux';

import { NotFound } from '../NotFound/NotFound.js';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
// import ImageUploader from 'react-images-upload';

class Component extends React.Component {
  state = {
    post: {
      author: '',
      created: '',
      updated: '',
      status: '',
      title: '',
      text: '',
      photo: null,
      price: '',
      phone: '',
      location: '',
    },
  };

  updateTextField = ({ target }) => {
    const { post } = this.state;
    const { name, value } = target;

    this.setState({ post: { ...post, [name]: value } });
  };

  newDate = () => {
    const dateObj = new Date();
    const month = dateObj.getUTCMonth() + 1; //months from 1-12
    const day = dateObj.getUTCDate();
    const year = dateObj.getUTCFullYear();

    let newdate = day + '/' + month + '/' + year;
    return newdate;
  };

  submitForm = (e) => {
    e.preventDefault();
    const { post } = this.state;
    const { addPost } = this.props;
    this.setState({ post: { ...post,  created: this.newDate() } });
    setTimeout(() => {
      addPost(this.state.post);
    }, 1000);
  };

  render() {
    const { updateTextField, submitForm } = this;
    const { className, userStatus } = this.props;
    const { post } = this.state;

    return (
      <div className={clsx(className, styles.root)}>
        <h2>PostAdd</h2>
        {userStatus === true ? (
          <Grid container align='center' justifyContent='center'>
            <Grid item align='center' xs={12} sm={9}>
              <Paper className={styles.form}>
                <form onSubmit={submitForm}>
                  <Typography variant='h6'>
                    Fill the fields to add an announcement
                  </Typography>

                  <Grid item align='center' xs={12} sm={9}>
                    <TextField
                      required
                      name='title'
                      label='Title'
                      variant='filled'
                      onChange={updateTextField}
                      helperText='min. 10 characters'
                      fullWidth
                    />
                  </Grid>
                  <Grid item align='center' xs={12} sm={9}>
                    <TextField
                      required
                      name='text'
                      label='Give the full description!'
                      variant='filled'
                      onChange={updateTextField}
                      helperText='min. 20 characters'
                      fullWidth
                    />
                  </Grid>
                  <Grid item align='center' xs={12} sm={9}>
                    <TextField
                      required
                      name='author'
                      label='Your Email'
                      variant='filled'
                      onChange={updateTextField}
                      helperText='Put your vaild email'
                      fullWidth
                    />
                  </Grid>
                  <Grid item align='center' xs={12} sm={9}>
                    <TextField
                      required
                      name='photo'
                      label='photo url'
                      variant='filled'
                      onChange={updateTextField}
                      helperText='put your link to photo'
                      fullWidth
                    />
                  </Grid>
                  <Grid item align='center' xs={12} sm={9}>
                    <TextField
                      required
                      name='location'
                      label='Location'
                      variant='filled'
                      onChange={updateTextField}
                      helperText='Location'
                      fullWidth
                    />
                  </Grid>
                  <Grid item align='center' xs={12} sm={9}>
                    <TextField
                      required
                      name='price'
                      label='Price'
                      variant='filled'
                      onChange={this.handlePrice}
                      helperText='Price in EUR'
                      fullWidth
                    />
                  </Grid>
                  <Grid item align='center' xs={12} sm={9}>
                    <TextField
                      required
                      name='phone'
                      label='Phone number'
                      variant='filled'
                      onChange={updateTextField}
                      helperText='Give you contact number'
                      fullWidth
                    />
                  </Grid>
                  <Grid item align='center' xs={12} sm={9}>
                    <TextField
                      required
                      name='author'
                      label='author'
                      variant='filled'
                      onChange={updateTextField}
                      helperText='Give you contact number'
                      fullWidth
                    />
                  </Grid>
                  <Grid item align='center' xs={12} sm={9}>
                    <FormControl fullWidth>
                      <InputLabel id='status'>Status of your add</InputLabel>
                      <Select
                        labelId='status'
                        id='status'
                        onChange={updateTextField}
                        fullWidth
                        variant='filled'
                        name='status'
                        value={post.status}
                        required
                      >
                        <MenuItem value='draft'>draft</MenuItem>
                        <MenuItem value='published'>published</MenuItem>
                        <MenuItem value='closed'>closed</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  {/* <Grid item xs={12} sm={9} className={styles.paperCard__item}>
                    <Typography align='center'>Add photo</Typography>
                    <ImageUploader
                      withIcon={true}
                      buttonText='Choose image'
                      imgExtension={['.jpg', '.gif', '.png', '.jpeg', '.jfif']}
                      maxFileSize={5242880}
                      withPreview={true}
                      onChange={this.setPhoto}
                      singleImage={true}
                      className={styles.file}
                    />
                  </Grid> */}
                  <Grid item xs={12} sm={9} align='center'>
                    <Button variant='contained' type='submit' color='secondary'>
                      Submit
                    </Button>
                  </Grid>
                </form>
              </Paper>
            </Grid>
          </Grid>
        ) : (
          <NotFound />
        )}
      </div>
    );
  }
}

Component.propTypes = {
  className: PropTypes.string,
  userStatus: PropTypes.bool,
  addPost: PropTypes.func,

};

const mapStateToProps = (state, props) => ({
  userStatus: getStatus(state),
});

const mapDispatchToProps = (dispatch) => ({
  addPost: (post) => dispatch(fetchAddPost(post)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  // Component as PostAdd,
  Container as PostAdd,
  Component as PostAddComponent,
};
