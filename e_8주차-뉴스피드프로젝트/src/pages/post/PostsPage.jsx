import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import supabase from '../../../../../expenditure-management-develop/src/config/supabase.js';
import { fetchPosts } from '../../redux/slices/blogSlice.js';

function PostsPage() {
  const { userId } = useParams();

  const posts = useSelector((state) => state.blog.posts);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    supabase
      .from('POSTS')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .then((response) => {
        const { error, data: posts } = response;
        if (!error) {
          dispatch(fetchPosts(posts));
        }
      });
  }, [userId, dispatch]);

  return (
    <PostsWrapper>
      <MenuNameWrapper>
        <MenuName>전체 게시글</MenuName>
        <MenuNameBottomLine></MenuNameBottomLine>
      </MenuNameWrapper>
      <PostsContainer>
        {posts.map((post) => {
          return (
            <PostsBox key={post.id} onClick={() => navigate(`/${userId}/blog/posts/${post.id}`)}>
              <PostsTitle>{post.title}</PostsTitle>
              <PostsContents>{post.contents}</PostsContents>
              <PostsCreatedAt>{post.createdAt}</PostsCreatedAt>
            </PostsBox>
          );
        })}
      </PostsContainer>
    </PostsWrapper>
  );
}

const PostsTitle = styled.p`
  width: 100%;
  height: 29px;

  font-family: 'Inter';
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 29px;
  /* identical to box height */
  text-align: center;

  color: #000000;

  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
const PostsContents = styled.p`
  width: 100%;
  height: 100px;

  font-family: 'Inter';
  font-style: normal;
  font-weight: 100;
  font-size: 20px;
  line-height: 24px;

  color: #000000;

  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-all;
`;
const PostsCreatedAt = styled.p`
  width: 200px;
  background-color: #f4f4f4;
  color: #7d7d7d;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
`;

const PostsWrapper = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
`;

const MenuNameWrapper = styled.div`
  margin-top: 50px;
  width: 116px;
  height: 29px;
`;

const MenuName = styled.p`
  width: 100%;
  height: 100%;

  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 29px;
  color: #ff6077;
`;

const MenuNameBottomLine = styled.div`
  width: 50px;
  margin: 0 auto;
  border: 1px solid#FF6077;
`;

const PostsContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  margin-top: 30px;
`;

const PostsBox = styled.div`
  padding: 0 30px;
  margin-top: 20px;
  margin-bottom: 20px;
  width: 600px;
  height: 300px;
  //background: #FFF6F8;
  background: white;
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  border-radius: 4px;
  box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.04);

  &:hover {
    cursor: pointer;
    transform: scale(1.03);
    transition: all 0.3s ease;
    box-shadow: 0px 10px 10px 0px rgba(0, 0, 0, 0.1);
  }
`;

export default PostsPage;
