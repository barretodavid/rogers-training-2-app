import { PostsEffect } from './posts.effect';
import { of, throwError } from 'rxjs';
import {
  GetAllPostsStartAction,
  GetAllPostsSuccessAction,
  GetAllPostsErrorAction,
} from './posts.actions';

describe('PostsEffect', () => {
  describe('#getAll$', () => {
    describe('when the GetAllPostsStartAction is emitted on the action$ stream', () => {
      describe('when the "postsService" replies successfully', () => {
        it('should emit the action GetAllPostsSuccessAction', () => {
          const fakeActions$ = of(new GetAllPostsStartAction());
          const fakePostsService = {
            getAll: () => of([]),
          };
          const effect = new PostsEffect(
            fakeActions$ as any,
            fakePostsService as any,
          );
          effect.getAll$.subscribe(action => {
            expect(action).toEqual(new GetAllPostsSuccessAction({ posts: [] }));
          });
        });
      });
      describe('when the "postsService" throws an exception', () => {
        it('should emit the action GetAllPostsErrorAction', () => {
          const fakeActions$ = of(new GetAllPostsStartAction());
          const fakePostsService = {
            getAll: () => throwError(''),
          };
          const effect = new PostsEffect(
            fakeActions$ as any,
            fakePostsService as any,
          );
          effect.getAll$.subscribe(action => {
            expect(action).toEqual(
              new GetAllPostsErrorAction({
                error: 'Failed to connect to backend',
              }),
            );
          });
        });
      });
    });
  });
});
