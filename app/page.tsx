export default function Home() {
  return (
    <section className="relative px-4 py-16 text-center md:py-20 lg:py-28">
      <div className="mx-auto max-w-3xl space-y-5 md:space-y-7">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-muted-foreground sm:text-sm">
          Cửa hàng trực tuyến
        </p>

        <h1 className="text-balance text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
          <span className="block text-foreground">Chào mừng bạn</span>
          <span className="mt-2 block bg-gradient-to-r from-foreground via-foreground/85 to-muted-foreground bg-clip-text text-transparent dark:from-white dark:via-zinc-100 dark:to-zinc-500">
            đến với  <strong>Mini Shop</strong>
          </span>
        </h1>

        <div
          className="mx-auto h-px w-20 bg-gradient-to-r from-transparent via-border to-transparent md:w-28"
          aria-hidden
        />

        <p className="mx-auto max-w-2xl text-balance text-base leading-relaxed text-muted-foreground md:text-lg md:leading-relaxed">
          Trang web này cung cấp các sản phẩm — nơi mỗi món đều được giới
          thiệu <span className="font-medium text-foreground/90">rõ ràng, trung thực</span>, để
          bạn yên tâm khi lựa chọn.
        </p>
      </div>
    </section>
  )
}
