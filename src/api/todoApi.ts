import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Todo } from "../types/Todo";

export const todoApi = createApi({
	reducerPath: "todoApi",
	baseQuery: fetchBaseQuery({ baseUrl: "https://jsonplaceholder.typicode.com/" }),
	tagTypes: ["Todo"],
	endpoints: (builder) => ({
		getTodoList: builder.query<Todo[], void>({
			query: () => "todos",
		}),
		addTodo: builder.mutation<Todo, Partial<Todo>>({
			query: (newTodo) => ({
				url: "todos",
				method: "POST",
				body: newTodo,
			}),
		}),
		updateTodo: builder.mutation<Todo, Partial<Todo>>({
			query: ({ id, ...patch }) => ({
				url: `todos/${id}`,
				method: "PUT",
				body: patch,
			}),
		}),
		deleteTodo: builder.mutation<{ success: boolean; id: number }, number>({
			query: (id) => ({
				url: `todos/${id}`,
				method: "DELETE",
			}),
		}),
	}),
});

export const {
	useGetTodoListQuery,
	useAddTodoMutation,
	useUpdateTodoMutation,
	useDeleteTodoMutation,
} = todoApi;
