import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.post.deleteMany();

  await prisma.post.createMany({
    data: [
      {
        slug: 'hello-world',
        title: '我的第一篇博客文章',
        description:
          '这是自建博客项目的第一篇测试文章，用于验证文章列表和详情页面。',
        date: new Date('2026-06-08'),
        tags: ['Next.js', 'Blog', 'TypeScript'],
        content: `这是我的第一篇博客文章。

当前项目已经完成了基础工程初始化，包括：

- 前端项目初始化
- 后端项目初始化
- Git 版本管理
- GitHub 远程仓库
- 前端基础页面
- 动态文章详情页

下一步会继续完善后端接口、数据库和后台管理功能。`,
      },
      {
        slug: 'project-plan',
        title: '自建博客项目规划',
        description: '记录这个博客项目从初始化到部署上线的完整路线。',
        date: new Date('2026-06-08'),
        tags: ['Project', 'Plan'],
        content: `这个博客项目计划分为多个阶段：

1. 环境准备
2. 项目初始化
3. 前端页面
4. 后端接口
5. 数据库
6. 后台管理
7. 登录权限
8. 部署上线

当前阶段的重点是把文章数据从代码中的临时数组迁移到 PostgreSQL 数据库。`,
      },
    ],
  });

  console.log('Seed data inserted successfully.');
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
