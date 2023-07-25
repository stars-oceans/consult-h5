import { http } from '@/utils/http'

/**
 *
 * @param type { recommend推荐，fatReduction减脂，food健康饮食like关注医生页面文章 }
 * @param current 示例值:1
 * @param pageSize 示例值:10
 * @returns
 */
export const getknowledgeListAPI = (
  type: string = 'like',
  current: string = '1',
  pageSize: string = '2'
) => {
  return http({
    url: '/patient/home/knowledge',
    params: {
      type: type,
      current: current,
      pageSize: pageSize
    }
  })
}

/**
 * 关注的医生列表：优先展示没有关注过的医生。
在疾病详情页面，专家推荐也使用这个接口。
 * @param current  当前页，默认是1 可选 示例值: 1
 * @param pageSize 每页大小默认5 可选 示例值: 5
 * @returns 
 */
export function getDocListAPI(current?: string, pageSize?: string) {
  return http({
    method: 'get',
    url: '/home/page/doc',
    params: {
      current: current,
      pageSize: pageSize
    }
  })
}
