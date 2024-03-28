import {memo, useCallback, useMemo} from 'react';
import {useParams} from 'react-router-dom';
import useStore from '../../hooks/use-store';
import useTranslate from '../../hooks/use-translate';
import useInit from '../../hooks/use-init';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import Navigation from '../../containers/navigation';
import Spinner from '../../components/spinner';
import ArticleCard from '../../components/article-card';
import LocaleSelect from '../../containers/locale-select';
import TopHead from '../../containers/top-head';
import {useDispatch, useSelector} from 'react-redux';
import shallowequal from 'shallowequal';
import articleActions from '../../store-redux/article/actions';
import commentsActions from '../../store-redux/comments/actions';
import Article from '../../containers/article';
import Comments from '../../containers/comments';

function ArticlePage() {

  const oldStore = useStore()
  const dispatch = useDispatch();
  // Параметры из пути /articles/:id

  const params = useParams();

  useInit(() => {
    //store.actions.article.load(params.id);
    oldStore.actions.session.remind();
    dispatch(articleActions.load(params.id));
    dispatch(commentsActions.load(params.id));
    oldStore.actions.profile.load();
  }, [params.id]);
/*
  const select = useSelector(state => ({
    article: state.article.data,
    waiting: state.article.waiting,
    comments: state.comments.data,
    commentsWaitong: state.comments.waiting,
    state: state,
  }), shallowequal); // Нужно указать функцию для сравнения свойства объекта, так как хуком вернули объект
  console.log(select.state); */

  return (
    <PageLayout>
      <TopHead/>
      <Article />
      <Comments />
    </PageLayout>
  );
}

export default memo(ArticlePage);
