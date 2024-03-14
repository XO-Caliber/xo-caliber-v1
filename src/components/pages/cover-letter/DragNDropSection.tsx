"use client";
import { ChevronDown, GripVertical, MessageCircle } from "lucide-react";
import React, { useState } from "react";
import { DragDropContext, Draggable, DropResult, Droppable } from "react-beautiful-dnd";

const DATA = [
  {
    id: "123",
    section: "Introduction",
    content: "To enhance cybersecurity, it is essential to implement advanced encryption methods.",
    exhibits: [
      { id: "1", content: "Exploration of novel encryption algorithms" },
      { id: "2", content: "Comparative analysis of SSL/TLS protocols" }
    ]
  },
  {
    id: "456",
    section: "Implementation",
    content:
      "In this phase, we delve into practical aspects of integrating open-source SSL certificates into existing systems.",
    exhibits: [
      { id: "3", content: "Case studies on successful SSL implementation in large enterprises" },
      { id: "4", content: "Best practices for optimizing SSL certificate usage" }
    ]
  },
  {
    id: "789",
    section: "Challenges and Solutions",
    content: "While open-source SSL certificates offer numerous advantages, challenges may arise. ",
    exhibits: [
      { id: "5", content: "Identification and mitigation of SSL vulnerabilities" },
      { id: "6", content: "Addressing performance issues in SSL-encrypted communication" }
    ]
  }
];

const DragNDropSection = () => {
  const [sections, setSections] = useState(DATA);

  const handleDragDrop = (results: DropResult) => {
    console.log(results);
    console.log("Dropped");
    const { source, destination, type } = results;
    if (!destination) return;

    if (source.droppableId === destination.droppableId && source.index === destination.index)
      return;

    if (type === "group") {
      const reOrderedStore = [...sections];
      const sourceIndex = source.index;
      const destinationIndex = destination.index;

      const [removedStore] = reOrderedStore.splice(sourceIndex, 1);
      reOrderedStore.splice(destinationIndex, 0, removedStore);

      return setSections(reOrderedStore);
    }

    const sectionSourceIndex = sections.findIndex((section) => section.id === source.droppableId);
    const sectionDestinationIndex = sections.findIndex(
      (section) => section.id === destination.droppableId
    );

    const newSourceItems = [...sections[sectionSourceIndex].exhibits];
    const newDestinationItems =
      source.droppableId != destination.droppableId
        ? [...sections[sectionDestinationIndex].exhibits]
        : newSourceItems;

    const [deletedItems] = newSourceItems.splice(source.index, 1);
    newDestinationItems.splice(destination.index, 0, deletedItems);

    const newSections = [...sections];

    newSections[sectionSourceIndex] = {
      ...sections[sectionSourceIndex],
      exhibits: newSourceItems
    };

    newSections[sectionDestinationIndex] = {
      ...sections[sectionDestinationIndex],
      exhibits: newDestinationItems
    };

    setSections(newSections);
  };

  return (
    <main
      className="h-max w-full p-2 pt-0 transition-all duration-500 ease-in-out"
      data-collapse="animated-collapse-1"
    >
      <DragDropContext onDragEnd={handleDragDrop}>
        <Droppable droppableId="ROOT" type="group">
          {(provided) => (
            <main className="w-full" {...provided.droppableProps} ref={provided.innerRef}>
              {sections.map((section, index) => (
                <Draggable draggableId={section.id} key={section.id} index={index}>
                  {(provided) => (
                    <div
                      {...provided.dragHandleProps}
                      {...provided.draggableProps}
                      ref={provided.innerRef}
                      className="text-center"
                    >
                      <Droppable droppableId={section.id}>
                        {(provided) => (
                          <div {...provided.droppableProps} ref={provided.innerRef} className="">
                            <section className="flex h-full w-full items-center justify-normal gap-6 border border-border bg-secondary p-3">
                              <GripVertical size={18} className="w-16" />
                              <ChevronDown size={18} className="w-16" />
                              {/* <h1 className="text-base">Section-{index + 1}</h1> */}
                              <h2 className="text-nowrap rounded-md border border-border bg-white p-1 text-sm font-semibold">
                                Section-{index + 1}
                              </h2>
                              <p className="w-full overflow-hidden overflow-ellipsis text-nowrap text-left text-[15px] font-medium ">
                                {section.content}
                              </p>
                              <i className="ml-auto mr-8 flex flex-row items-center justify-items-end gap-1 text-base">
                                <MessageCircle size={16} />
                                Comment
                              </i>
                            </section>
                            {section.exhibits.map((exhibit, index) => (
                              <Draggable draggableId={exhibit.id} key={exhibit.id} index={index}>
                                {(provided) => (
                                  <div
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    ref={provided.innerRef}
                                    // className="grid h-full w-full grid-flow-col items-center justify-around border border-border p-1"
                                    className="flex h-full w-full items-center justify-normal gap-14 border border-border px-16 py-1.5"
                                    key={exhibit.id}
                                  >
                                    <GripVertical size={18} className="w-16" />
                                    <ChevronDown size={18} className="w-16" />
                                    {/* <h1 className="text-sm">Exhibit-{index + 1}</h1> */}
                                    <h2 className="rounded-md border border-border bg-white p-1 text-sm font-semibold">
                                      Exhibit
                                    </h2>
                                    <p className="w-full overflow-hidden overflow-ellipsis text-nowrap text-left text-sm">
                                      {exhibit.content}
                                    </p>
                                    <i className="ml-auto flex flex-row items-center gap-1 justify-self-end text-base">
                                      <MessageCircle size={16} />
                                      Comment
                                    </i>
                                  </div>
                                )}
                              </Draggable>
                            ))}
                            {provided.placeholder}
                          </div>
                        )}
                      </Droppable>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </main>
          )}
        </Droppable>
      </DragDropContext>
    </main>
  );
};

export default DragNDropSection;