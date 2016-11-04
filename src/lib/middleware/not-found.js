import { notFound } from 'boom';

export default function notFoundMiddleware() {
  throw notFound();
}
