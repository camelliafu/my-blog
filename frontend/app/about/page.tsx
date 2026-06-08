export default function AboutPage() {
  return (
    <div className="rounded-2xl bg-white p-8 shadow-sm">
      <h1 className="text-3xl font-bold text-gray-900">关于我</h1>

      <div className="mt-6 space-y-4 leading-8 text-gray-700">
        <p>这是一个个人博客项目，用于记录学习、项目实践和技术成长。</p>

        <p>
          当前博客系统正在从零开始构建，目标是逐步实现前台展示、
          后台管理、文章发布、登录权限、数据库存储和 Docker 部署。
        </p>

        <p>这个页面后续可以补充个人介绍、项目经历、联系方式和技术栈。</p>
      </div>
    </div>
  );
}
