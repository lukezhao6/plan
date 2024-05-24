package com.luke.plan.common;
import com.luke.plan.domain.BaseEntity;
import org.apache.ibatis.executor.Executor;
import org.apache.ibatis.mapping.MappedStatement;
import org.apache.ibatis.mapping.SqlCommandType;
import org.apache.ibatis.plugin.*;
import org.springframework.stereotype.Component;

import java.lang.reflect.Field;
import java.util.Date;
import java.util.HashMap;
import java.util.Properties;

/**
 * @Description: 拦截保存和更新方法，保存时创建时间，创建人，创建人id，修改时候更新修改时间，修改人，修改人id
 */
@Component
@Intercepts(@Signature(type = Executor.class, method = "update", args = {MappedStatement.class, Object.class}))
public class MybatisBaseEntityIntercepter implements Interceptor {

    @Override
    public Object intercept(Invocation invocation) throws Throwable {
        MappedStatement mappedStatement = (MappedStatement) invocation.getArgs()[0];
        SqlCommandType sqlCommandType = mappedStatement.getSqlCommandType();
        Object parameter = invocation.getArgs()[1];
        //更新操作会拿到一个map。不是一个实体 。，需要转一下
        if (SqlCommandType.UPDATE.equals(sqlCommandType)) {
            HashMap map = (HashMap) invocation.getArgs()[1];
            parameter = map.values().toArray()[0];
        }
        Class<?> clazz = parameter.getClass();
        if (clazz.getSuperclass().equals(BaseEntity.class)) {
            updateFeild(clazz.getSuperclass().getDeclaredFields(), parameter, sqlCommandType);
        }
        return invocation.proceed();
    }

    @Override
    public Object plugin(Object target) {
        return Plugin.wrap(target, this);
    }

    @Override
    public void setProperties(Properties properties) {

    }

    private void updateFeild(Field[] declaredFields, Object parameter, SqlCommandType sqlCommandType) throws IllegalAccessException {
        /**
         * TODO:获取当前登入用户用户名，用来更新实体
         */
        Long userId = 1L;
        String userName = "你叉叉";
        for (Field field : declaredFields) {
            field.setAccessible(true);
            if (SqlCommandType.INSERT.equals(sqlCommandType)) {
                switch (field.getName()) {
                    case "createdTime":
                        field.set(parameter, new Date());
                        break;
                    case "creatorId":
                        field.set(parameter, userId + "");
                        break;
                    case "creator":
                        field.set(parameter, userName);
                        break;
                }
            } else if (SqlCommandType.UPDATE.equals(sqlCommandType)) {
                switch (field.getName()) {
                    case "updatedTime":
                        field.set(parameter, new Date());
                        break;
                    case "updatorId":
                        field.set(parameter, userId + "");
                        break;
                    case "updator":
                        field.set(parameter, userName);
                        break;
                }
            }
        }
    }
}
