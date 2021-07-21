import React from 'react';
import PropTypes from 'prop-types';
import styles from './PostEdit.module.scss';

import clsx from 'clsx';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import SaveIcon from '@material-ui/icons/Save';
import Button from '@material-ui/core/Button';

import ImageUploader from 'react-images-upload';

import { connect } from 'react-redux';
import { getAll, getOnePost } from '../../../redux/postsRedux';

class Component extends React.Component {
  render() {
    const { className, post } = this.props;

    return (
      <div className={clsx(className, styles.root)}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Paper className={styles.paper}>
              <TextField
                variant='outlined'
                className={styles.textField}
                required
                id='outlined-basic'
                label='Title'
                inputProps={{ minLength: 10, maxLength: 40 }}
                defaultValue={post.title}
              />
              <TextField
                className={styles.textField}
                id='outlined-textarea'
                label='Description'
                placeholder='Placeholder'
                multiline
                variant='outlined'
                fullWidth
                inputProps={{ minLength: 20, maxLength: 500 }}
                defaultValue={post.content}
              />
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper className={styles.paper}>
              <TextField
                id='outlined-basic'
                label='Email'
                variant='outlined'
                className={styles.textField}
                required
                defaultValue={post.email}
              />
              <TextField
                id='outlined-basic'
                label='Phone'
                variant='outlined'
                name='phone'
                className={styles.textField}
                required
                defaultValue={post.phone}
              />
              <TextField
                id='outlined-basic'
                label='Location'
                variant='outlined'
                className={styles.textField}
                fullWidth
                required
                defaultValue={post.location}
              />
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper className={styles.imageUploader}>
              <ImageUploader
                withIcon={true}
                buttonText='Choose image'
                imgExtension={['.jpg', '.gif', '.png', '.gif']}
                maxFileSize={5242880}
                singleImage={true}
              />
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper className={styles.paper}>
              <TextField
                id='outlined-basic'
                label='Price'
                variant='outlined'
                type='number'
                className={styles.textField}
                required
                defaultValue={post.price}
              />
              <Button
                className={styles.btnSave}
                variant='contained'
                color='primary'
              >
                <SaveIcon className={styles.icon} />
                Save
              </Button>
              <FormControl variant='outlined' className={styles.status}>
                <InputLabel htmlFor='outlined-age-native-simple'>
                  Status
                </InputLabel>
                <Select value={post.text} native>
                  <option>{post.status}</option>
                  <option>draft</option>
                  <option>published</option>
                  <option>finished</option>
                </Select>
              </FormControl>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}
Component.propTypes = {
  className: PropTypes.string,
  match: PropTypes.object,
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
      image: PropTypes.string,
      price: PropTypes.number,
      phone: PropTypes.string,
      location: PropTypes.string,
    })
  ),
};

const mapStateToProps = (state, props) => ({
  posts: getAll(state),
  post: getOnePost(state, props.match.params.id),
});

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

// const Container = connect(mapStateToProps, mapDispatchToProps)(Component);
const Container = connect(mapStateToProps)(Component);

export { Container as PostEdit, Component as PostEditComponent };
