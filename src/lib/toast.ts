import { sileo } from 'sileo';

/**
 * Adaptador delgado sobre sileo.
 *
 * El API de sileo recibe un objeto `SileoOptions`; este wrapper acepta un
 * string simple (el caso de uso 99% del tiempo) y lo mapea a `{ title }`,
 * para que los componentes llamen `toast.success('Listo')` sin fricción.
 */
type Message = string;

export const toast = {
  show: (message: Message) => sileo.show({ title: message }),
  success: (message: Message) => sileo.success({ title: message }),
  error: (message: Message) => sileo.error({ title: message }),
  warning: (message: Message) => sileo.warning({ title: message }),
  info: (message: Message) => sileo.info({ title: message }),
};

export default toast;
