import React from 'react';
import { Helmet } from 'react-helmet-async';
// @mui
import {
  Grid,
  Button,
  Container,
  Stack,
  Typography,
  TableCell,
  TableRow,
  TableBody,
  TableContainer,
  TableHead,
  Table,
} from '@mui/material';
// components
import Iconify from '../components/iconify';
import { BlogPostCard, BlogPostsSort, BlogPostsSearch } from '../sections/@dashboard/blog';
// mock
import POSTS from '../_mock/blog';

const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  { value: 'popular', label: 'Popular' },
  { value: 'oldest', label: 'Oldest' },
];

const ReportsPage = () => {
  const [reports, setReports] = React.useState([]);

  React.useEffect(() => {
    fetch(`http://localhost:8000/reports/`, {
      headers: {
        authorization: sessionStorage.getItem('accessToken'),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.msg) {
          alert(data.msg);
        } else {
          setReports(data);
        }
      });
  }, []);
  return (
    <>
      <Helmet>
        <title> Dashboard: Reports </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Reports
          </Typography>
        </Stack>
        {/* 
        <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
          <BlogPostsSearch posts={POSTS} />
          <BlogPostsSort options={SORT_OPTIONS} />
        </Stack> */}

        <TableContainer sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Blog Name</TableCell>

                <TableCell>Reported By</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reports.map((item, index) => {
                return (
                  <TableRow hover key={index} tabIndex={-1} role="checkbox">
                    <TableCell>{item?.post?.title}</TableCell>
                    <TableCell>{item?.user?.name}</TableCell>
                    <TableCell>
                      <Button
                        color="error"
                        onClick={() => {
                          fetch(`http://localhost:8000/report/${item?.post?._id}/${item?._id}`, {
                            method: 'DELETE',
                          })
                            .then((res) => res.json())
                            .then((data) => {
                              if (data.msg) {
                                alert(data.msg);
                              } else {
                                alert('Deleted Successfully!');
                                window.location.reload();
                              }
                            })
                            .catch((err) => console.log(err));
                        }}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>

        {/* <Grid container spacing={3}>
          {POSTS.map((post, index) => (
            <BlogPostCard key={post.id} post={post} index={index} />
          ))}
        </Grid> */}
      </Container>
    </>
  );
};

export default ReportsPage;
