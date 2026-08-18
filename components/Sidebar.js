'use client';

import { useState } from 'react';

export default function Sidebar({ tree, selected, onSelect }) {
  const [open, setOpen] = useState(true);

  return (
    <aside className={open ? 'sidebar open' : 'sidebar'}>

      <button
        className="mobileClose"
        onClick={() => setOpen(false)}
      >
        ✕
      </button>

      <h3>Syllabus</h3>

      {(tree || []).map((unit) => (
        <div key={unit.id} className="unit">

          {/* UNIT */}
          <div className="unitTitle">
            <span className="unitArrow">⌄</span>
            <span>
              {unit.code} {unit.title}
            </span>
          </div>

          {(unit.children || []).map((topic) => (
            <div key={topic.id} className="topic">

              {/* MAIN TOPIC */}
              <button
                className={`topicBtn ${
                  selected === topic.id ? 'active' : ''
                }`}
                onClick={() => {
                  onSelect(topic.id);
                  setOpen(false);
                }}
              >
                <span className="topicArrow">⌄</span>
                <span>
                  {topic.code} {topic.title}
                </span>
              </button>

              {/* SUB TOPICS */}
              {(topic.children || []).map((sub) => (
                <button
                  key={sub.id}
                  className={`subBtn ${
                    selected === sub.id ? 'active' : ''
                  }`}
                  onClick={() => {
                    onSelect(sub.id);
                    setOpen(false);
                  }}
                >
                  <span>
                    {sub.code} {sub.title}
                  </span>
                </button>
              ))}

            </div>
          ))}

        </div>
      ))}

    </aside>
  );
}
