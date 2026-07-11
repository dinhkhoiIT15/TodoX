import Header from '@/components/Header';
import AddTask from '@/components/AddTask';
import StatsAndFilters from '@/components/StatsAndFilters';
import TaskList from '@/components/TaskList';
import TaskListPagination from '@/components/TaskListPagination';
import DateTimeFilter from '@/components/DateTimeFilter';
import Footer from '@/components/Footer';
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';
import api from '@/lib/axios';
import { visibleTasksLimit } from '@/lib/data';

const HomePage = () => {
  const [taskBuffer, setTaskBuffer] = useState([]);
  const [activeCount, setactiveCount] = useState(0);
  const [completeCount, setcompleteCount] = useState(0);
  const [filter, setFilter] = useState("all");
  const [dateQuery, setDateQuery] = useState("today");
  const [page, setPage] = useState(1);

  useEffect(() => { //Chay 1 lan duy nhat khi trinh duyet duoc render
    fetchTasks();
  }, [dateQuery]);

  useEffect(() => { //Chay 1 lan duy nhat khi trinh duyet duoc render
    setPage(1);
  }, [filter, dateQuery]);

  //Logic
  const fetchTasks = async () => {
    try{
      const res = await api.get(`/tasks?filter=${dateQuery}`);
      setTaskBuffer(res.data.tasks);
      setactiveCount(res.data.activeCount);
      setcompleteCount(res.data.completeCount);
    } catch (error) {
      console.log("Loi xay ra khi truy xuat tasks", error);
      toast.error("Loi xay ra khi truy xuat tasks");
    }
  }

  const handleTaskChanged = () => {
    fetchTasks();
  };

  const handleNext = () => {
      if (page> 1) {
        setPage((prev) => prev - 1);
      }
    };

  const handlePrev = () => {
      if (page < totalPages) {
        setPage((prev) => prev + 1);
      }
    };

    const handlePageChange = (newPage) => {
      setPage(newPage);
    };

  // Bien 
  const filterTasks = taskBuffer.filter((task) => {
    switch (filter) {
      case 'active':
        return task.status === 'active';
      case 'completed':
        return task.status === 'completed';
      default:
        return true;
    }
  })

  const visibleTasks = filterTasks.slice(
    (page - 1) * visibleTasksLimit,
    page * visibleTasksLimit,
  );

  // if(visibleTasks.length === 0){
  //   handlePrev();
  // }

  const totalPages = Math.ceil(filterTasks.length / visibleTasksLimit);

  return (
    <div className="min-h-screen w-full bg-white relative">
      {/* Pink Glow Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
        radial-gradient(125% 125% at 50% 90%, #ffffff 40%, #ec4899 100%)
      `,
          backgroundSize: "100% 100%",
        }}
      />

      {/* Your Content/Components */}
      <div className="container pt-8 mx-auto min-w-screen relative z-10">
        <div className="w-full max-w-2xl p-6 mx-auto space-y-6">
          {/* Header */}
          <Header />

          {/* Add Task */}
          <AddTask handleNewTaskAdded={handleTaskChanged} />

          {/* Stats and Filters */}
          <StatsAndFilters
            filter={filter}
            setFilter={setFilter}
            activeTaskCount={activeCount}
            completedTaskCount={completeCount}
          />

          {/* Task List */}
          <TaskList
            filteredTasks={visibleTasks}
            filter={filter}
            handleTaskChanged={handleTaskChanged}
          />

          {/* Pagination and Date */}
          <div className="flex flex-col items-center justify-between gap-7 sm:flex-row">
            <TaskListPagination 
              handleNext={handleNext} handlePrev={handlePrev} handlePageChange={handlePageChange} page={page} totalPages={totalPages}/>
            <DateTimeFilter dateQuery={dateQuery} setDateQuery={setDateQuery} />
          </div>

          {/* Footer */}
          <Footer
            activeTaskCount={activeCount}
            completedTaskCount={completeCount}
          />
        </div>
      </div>
    </div>
  );
}

export default HomePage
