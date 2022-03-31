import {createParamDecorator, ExecutionContext} from '@nestjs/common';
import {createPagination} from '../../adapter/pagination/pagination.helper';

export const Pagination = createParamDecorator((data, exe: ExecutionContext) => {
    const [req] = exe.getArgs();
    return createPagination(req.query.page, req.query.perPage);
});
