import type { FormEvent } from "react";
import { useEffect, useId, useMemo, useState } from "react";

type TodoItem = {
  userId?: number;
  id: number;
  title: string;
  completed: boolean;
};

const PAGE_SIZE_OPTIONS = [5, 10, 50, 100] as const;

export default function Todo() {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showWaitingOnly, setShowWaitingOnly] = useState(false);
  const [pageSize, setPageSize] =
    useState<(typeof PAGE_SIZE_OPTIONS)[number]>(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTodoTitle, setNewTodoTitle] = useState("");
  const [addError, setAddError] = useState<string | null>(null);

  const waitingToggleId = useId();

  useEffect(() => {
    let ignore = false;

    async function loadTodos() {
      try {
        setLoading(true);
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/todos"
        );
        if (!response.ok) {
          throw new Error("ไม่สามารถดึงข้อมูล todos ได้");
        }
        const data = (await response.json()) as TodoItem[];
        if (!ignore) {
          setTodos(data);
          setError(null);
        }
      } catch (err) {
        if (!ignore) {
          setError(
            err instanceof Error ? err.message : "เกิดข้อผิดพลาดในการโหลดข้อมูล"
          );
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    void loadTodos();

    return () => {
      ignore = true;
    };
  }, []);

  const filteredTodos = useMemo(() => {
    return showWaitingOnly ? todos.filter((todo) => !todo.completed) : todos;
  }, [showWaitingOnly, todos]);

  useEffect(() => {
    const totalPages = Math.max(
      1,
      Math.ceil(filteredTodos.length / pageSize) || 1
    );
    setCurrentPage((prev) => {
      const next = Math.min(prev, totalPages);
      return next === prev ? prev : next;
    });
  }, [filteredTodos.length, pageSize]);

  const paginatedTodos = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredTodos.slice(startIndex, startIndex + pageSize);
  }, [currentPage, filteredTodos, pageSize]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredTodos.length / pageSize) || 1
  );

  const nextTodoId = useMemo(() => {
    return todos.reduce((max, todo) => Math.max(max, todo.id), 0) + 1;
  }, [todos]);

  const handleToggleStatus = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleDelete = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const openModal = () => {
    setAddError(null);
    setNewTodoTitle("");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setAddError(null);
  };

  const handleAddTodo = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedTitle = newTodoTitle.trim();
    if (!trimmedTitle) {
      setAddError("กรุณากรอกชื่อรายการก่อนบันทึก");
      return;
    }

    const nextTodos = [
      ...todos,
      { id: nextTodoId, title: trimmedTitle, completed: false },
    ];

    setTodos(nextTodos);
    setIsModalOpen(false);
    setNewTodoTitle("");
    setAddError(null);

    const latestList = showWaitingOnly
      ? nextTodos.filter((todo) => !todo.completed)
      : nextTodos;

    setCurrentPage(Math.max(1, Math.ceil(latestList.length / pageSize)));
  };

  const handlePageChange = (targetPage: number) => {
    setCurrentPage(Math.max(1, Math.min(targetPage, totalPages)));
  };

  return (
    <div className="container py-4 d-flex flex-column gap-4">
      <div className="p-4 bg-dark text-white rounded-4 shadow-lg">
        <h1 className="m-0 fs-3 fw-bold">Todos App</h1>
      </div>

      <section className="card shadow-lg border-light-subtle">
        <div className="card-body">
          <div className="d-flex flex-column flex-lg-row justify-content-lg-between gap-3 align-items-lg-center mb-3">
            <div className="d-flex flex-wrap align-items-center gap-3">
              <div className="form-check form-switch">
                <input
                  id={waitingToggleId}
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  checked={showWaitingOnly}
                  onChange={(event) => setShowWaitingOnly(event.target.checked)}
                />
                <label className="form-check-label" htmlFor={waitingToggleId}>
                  Show only
                </label>
              </div>
              <span
                className={`badge rounded-pill ${
                  showWaitingOnly ? "bg-warning text-dark" : "bg-secondary"
                }`}
              >
                waiting ⏱️
              </span>
            </div>

            <div className="d-flex align-items-center gap-2">
              <label htmlFor="page-size" className="text-muted small mb-0">
                Items per page
              </label>
              <select
                id="page-size"
                className="form-select form-select-sm"
                value={pageSize}
                onChange={(event) => {
                  setPageSize(
                    Number(event.target.value) as (typeof PAGE_SIZE_OPTIONS)[number]
                  );
                  setCurrentPage(1);
                }}
              >
                {PAGE_SIZE_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option} items per page
                  </option>
                ))}
              </select>
            </div>
          </div>

          {loading ? (
            <div className="py-5 text-center text-muted">กำลังโหลดข้อมูล...</div>
          ) : error ? (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          ) : (
            <>
              <div className="table-responsive">
                <table className="table table-hover align-middle table-striped">
                  <thead className="table-dark">
                    <tr>
                      <th className="text-center" style={{ width: "80px" }}>
                        ID
                      </th>
                      <th className="text-start">Title</th>
                      <th className="text-center" style={{ width: "200px" }}>
                        Completed
                        <button
                          type="button"
                          className="btn btn-primary btn-sm ms-2"
                          onClick={openModal}
                        >
                          +
                        </button>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedTodos.length === 0 ? (
                      <tr>
                        <td colSpan={3} className="text-center text-muted py-4">
                          ไม่มีรายการที่ตรงกับเงื่อนไข
                        </td>
                      </tr>
                    ) : (
                      paginatedTodos.map((todo) => (
                        <tr key={todo.id}>
                          <td className="text-center">
                            <span className="badge rounded-pill text-bg-secondary">
                              {todo.id}
                            </span>
                          </td>
                          <td className="text-start text-wrap">{todo.title}</td>
                          <td>
                            <div className="d-flex justify-content-center gap-2">
                              <button
                                type="button"
                                className={`btn btn-sm ${
                                  todo.completed
                                    ? "btn-success"
                                    : "btn-warning text-dark"
                                }`}
                                onClick={() => handleToggleStatus(todo.id)}
                              >
                                {todo.completed ? "done ✅" : "waiting ⏱️"}
                              </button>
                              <button
                                type="button"
                                className="btn btn-sm btn-danger"
                                onClick={() => handleDelete(todo.id)}
                              >
                                🗑️
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-2 mt-3">
                <div className="text-muted small">
                  หน้า {currentPage} / {totalPages} · ทั้งหมด{" "}
                  {filteredTodos.length} รายการ
                </div>
                <div className="d-flex gap-2">
                  <button
                    type="button"
                    className="btn btn-outline-secondary btn-sm"
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(1)}
                  >
                    First
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-secondary btn-sm"
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                  >
                    Previous
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-secondary btn-sm"
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageChange(currentPage + 1)}
                  >
                    Next
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-secondary btn-sm"
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageChange(totalPages)}
                  >
                    Last
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </section>

      <div
        className={`modal fade ${isModalOpen ? "show" : ""}`}
        style={{ display: isModalOpen ? "block" : "none" }}
        tabIndex={-1}
        role="dialog"
        onClick={closeModal}
      >
        <div
          className="modal-dialog modal-dialog-centered"
          role="document"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="modal-content rounded-4">
            <form onSubmit={handleAddTodo}>
              <div className="modal-header">
                <h5 className="modal-title fw-bold">Add todo</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={closeModal}
                  aria-label="Close add todo modal"
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="new-todo-id" className="form-label">
                    ID
                  </label>
                  <input
                    id="new-todo-id"
                    className="form-control"
                    value={nextTodoId}
                    readOnly
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="new-todo-title" className="form-label">
                    Title
                  </label>
                  <input
                    id="new-todo-title"
                    className="form-control"
                    placeholder="typing your todo title here..."
                    value={newTodoTitle}
                    onChange={(event) => {
                      setNewTodoTitle(event.target.value);
                      if (addError) {
                        setAddError(null);
                      }
                    }}
                    autoFocus
                  />
                </div>
                {addError ? (
                  <div className="alert alert-warning py-2" role="alert">
                    {addError}
                  </div>
                ) : null}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={closeModal}
                >
                  Close
                </button>
                <button type="submit" className="btn btn-primary">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {isModalOpen && <div className="modal-backdrop fade show"></div>}
    </div>
  );
}