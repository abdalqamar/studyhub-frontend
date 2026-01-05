const InstructorCard = ({ instructor }) => {
  return (
    <div className="group bg-slate-800/50 backdrop-blur-xl border border-slate-700 rounded-3xl p-6 text-center hover:border-purple-500/30 transition-all transform  cursor-pointer flex  items-center">
      <div className="h-24 w-24 mb-4">
        <img
          src={
            "https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=3017"
          }
          alt=""
        />
      </div>
      <h3 className="text-xl font-bold mb-1">{instructor.name}</h3>
      <p className="text-purple-400 font-semibold mb-1">{instructor.role}</p>
      <p className="text-slate-400 text-sm mb-4">{instructor.company}</p>

      <div className="grid grid-cols-3 gap-3 mb-4 text-sm">
        <div></div>
        <div>
          <div className="text-cyan-400 font-semibold">
            {instructor.students}
          </div>
          <div className="text-slate-400">Students</div>
        </div>
        <div></div>
      </div>

      <div className="flex flex-wrap justify-center gap-1">
        <span className="px-2 py-1 bg-purple-600/20 text-purple-300 rounded-full text-xs">
          Microsoft
        </span>
      </div>
    </div>
  );
};

export default InstructorCard;
