import { renderToStream, type RenderToStreamOptions } from "@builder.io/qwik/server";
import Root from "./root";

export default function (opts: RenderToStreamOptions) {
  return renderToStream(<Root />, {
    ...opts,
    preloader: false,
    qwikLoader: "inline",
    containerAttributes: {
      lang: "en",
      class: "dark h-full bg-background font-inter text-white",
      ...opts.containerAttributes,
    },
  });
}
