"use client";
import { ChevronDown, ChevronRight, GripVertical, MessageCircle } from "lucide-react";
import React, { useEffect, useState } from "react";
import { DragDropContext, Draggable, DropResult, Droppable } from "react-beautiful-dnd";
import { trpc } from "@/app/_trpc/client";
import {
  ExhibitPositionType,
  SectionPositionType,
  SectionType,
  SubSectionPositionType,
  SubSectionType
} from "@/types/CoverLetter";
import { Button } from "@/components/ui/Button";
import { toast } from "@/hooks/use-toast";
import AddDialog from "./AddDialog";
import { DialogType } from "@/types/Dialog";
import EditDialog from "./EditDialog";

const DragNDropSection = ({ userId, coverLetterId }: { userId: string; coverLetterId: string }) => {
  //@ts-ignore
  const data = trpc.coverletter.getSections.useQuery<SectionType[]>(coverLetterId);

  const { data: SectionsData, isLoading, error } = data;

  const refetchData = () => {
    data.refetch();
  };

  const { mutate: updateSectionPostion } = trpc.coverletter.updateSectionPostion.useMutation({
    onSuccess({ success }) {
      if (success) {
        refetchData();
        toast({
          title: "section postion updated",
          description: "Successfully updated the section"
        });
      }
    },
    onError(err) {
      toast({
        title: "Something went wrong",
        description: `${err}`
      });
    },
    onSettled() {
      // setLoading(false);
    }
  });

  const { mutate: updateSubSectionPostion } = trpc.coverletter.updateSubSectionPostion.useMutation({
    onSuccess({ success }) {
      if (success) {
        refetchData();
        toast({
          title: "SubSections postion updated",
          description: "Successfully updated the SubSection"
        });
      }
    },
    onError(err) {
      toast({
        title: "Something went wrong",
        description: `${err}`
      });
    },
    onSettled() {
      // setLoading(false);
    }
  });

  const { mutate: updateExhibitPostion } = trpc.coverletter.updateExhibitPostion.useMutation({
    onSuccess({ success }) {
      if (success) {
        refetchData();
        toast({
          title: "Exhibits postion updated",
          description: "Successfully updated the Exhibit"
        });
      }
    },
    onError(err) {
      toast({
        title: "Something went wrong",
        description: `${err}`
      });
    },
    onSettled() {
      // setLoading(false);
    }
  });

  const [sections, setSections] = useState<SectionType[]>();

  const [isSubSectionVisible, setIsSubSectionVisible] = useState<{ [key: number]: boolean }>({});
  const [isExhibitVisible, setIsExhibitVisible] = useState<{
    [key: number]: {
      [key: number]: boolean;
    };
  }>([]);

  const [updatedSectionsPosition, setupdatedSectionsPosition] = useState<SectionPositionType[]>();
  const [updatedSubSectionsPosition, setupdatedSubSectionsPosition] =
    useState<SubSectionPositionType[]>();
  const [updatedExhibitsPosition, setUpdatedExhibitsPosition] = useState<ExhibitPositionType[]>();

  useEffect(() => {
    if (SectionsData && !isLoading && !error) {
      setSections(SectionsData);
    }
  }, [SectionsData, isLoading, error]);

  const handleDragDrop = (results: DropResult) => {
    console.log(results);
    // setDropData(results);
    const { source, destination, type, draggableId } = results;
    if (!destination) return;

    if (source.droppableId === destination.droppableId && source.index === destination.index)
      return;

    if (sections) {
      if (type === "group") {
        const reOrderedStore = [...sections];
        const sourceIndex = source.index;
        const destinationIndex = destination.index;

        const [removedStore] = reOrderedStore.splice(sourceIndex, 1);
        reOrderedStore.splice(destinationIndex, 0, removedStore);

        const updatedSections = reOrderedStore.map((section, index) => ({
          ...section,
          position: index
        }));

        console.log("reorderedStore: ", reOrderedStore);
        console.log("updatedSections: ", updatedSections);

        const sectionPositions = updatedSections.map((section) => ({
          id: section.id,
          position: section.position
        }));

        console.log("sectionPositions: ", JSON.stringify(sectionPositions));

        setupdatedSectionsPosition(sectionPositions);
        return setSections(updatedSections);
      }

      if (type === "section") {
        const sectionSourceIndex = sections.findIndex(
          (section) => section.id === source.droppableId
        );
        const sectionDestinationIndex = sections.findIndex(
          (section) => section.id === destination.droppableId
        );

        const newSourceItems = [...sections[sectionSourceIndex].SubSection];
        const newDestinationItems =
          source.droppableId != destination.droppableId
            ? [...sections[sectionDestinationIndex].SubSection]
            : newSourceItems;

        const [deletedItems] = newSourceItems.splice(source.index, 1);
        newDestinationItems.splice(destination.index, 0, deletedItems);

        const newSections = [...sections];

        newSections[sectionSourceIndex] = {
          ...sections[sectionSourceIndex],
          SubSection: newSourceItems
        };

        newSections[sectionDestinationIndex] = {
          ...sections[sectionDestinationIndex],
          SubSection: newDestinationItems
        };
        console.log("newSection: ", newSections);

        const subSectionPostions = newSections.flatMap((section) =>
          section.SubSection.map((subsection, index) => ({
            id: subsection.id,
            sectionId: section.id,
            position: index
          }))
        );
        console.log("subSectionPostion: ", subSectionPostions);
        setupdatedSubSectionsPosition(subSectionPostions);
        setSections(newSections);
      }

      if (type === "subsection") {
        let sourceSubSection: SubSectionType | undefined,
          destinationSubSection: SubSectionType | undefined;

        const updatedSections = sections.map((section) => {
          if (!sourceSubSection) {
            sourceSubSection = section.SubSection.find(
              (subSection) => subSection.id === source.droppableId
            );
          }

          if (!destinationSubSection) {
            destinationSubSection = section.SubSection.find(
              (subSection) => subSection.id === destination.droppableId
            );
          }

          if (!sourceSubSection || !destinationSubSection) return section;
          if (!sourceSubSection && !destinationSubSection) return section;
          console.log("after subsection");

          // Find the dragged exhibit
          const draggedExhibitIndex = sourceSubSection.Exhibits.findIndex(
            (exhibit) => exhibit.id === draggableId
          );
          if (draggedExhibitIndex === -1) return section;

          const draggedExhibit = sourceSubSection.Exhibits[draggedExhibitIndex];

          // Remove the dragged exhibit from the source subsection
          sourceSubSection.Exhibits.splice(draggedExhibitIndex, 1);

          // Insert the dragged exhibit into the destination subsection at the specified index
          destinationSubSection.Exhibits.splice(destination.index, 0, draggedExhibit);

          // Update positions if necessary
          if (sourceSubSection.id === destinationSubSection.id) {
            // If the drag is within the same subsection, update positions for affected exhibits
            destinationSubSection.Exhibits.forEach((exhibit, index) => {
              exhibit.position = index;
            });
          } else {
            // If the drag is between different subsections, update positions for both source and destination subsections
            sourceSubSection.Exhibits.forEach((exhibit, index) => {
              exhibit.position = index;
            });

            destinationSubSection.Exhibits.forEach((exhibit, index) => {
              exhibit.position = index;
              exhibit.subSectionId = destinationSubSection.id;
            });
          }
          return section;
        });
        console.log(updatedSections);
        setSections(updatedSections);
        const exhibitPositions = sections.flatMap((section) =>
          section.SubSection.flatMap((subSection) =>
            subSection.Exhibits.map((exhibit, index) => ({
              id: exhibit.id,
              subSectionId: exhibit.subSectionId,
              position: index
            }))
          )
        );
        console.log("exhibitPositions: ", exhibitPositions);
        setUpdatedExhibitsPosition(exhibitPositions);
      }
    }
  };

  const updateSectionPostionInDb = () => {};

  const updateSubSectionPostionInDb = () => {
    if (updatedSectionsPosition) updateSectionPostion(updatedSectionsPosition);
    if (updatedSubSectionsPosition) updateSubSectionPostion(updatedSubSectionsPosition);
    if (updatedExhibitsPosition) updateExhibitPostion(updatedExhibitsPosition);
  };

  const toggleSubSection = (index: number) => {
    setIsSubSectionVisible((prevState) => ({
      ...prevState,
      [index]: !prevState[index]
    }));
  };

  const toggleExhibit = (outerKey: number, innerKey: number) => {
    console.log("outerKey: ", outerKey);
    console.log("innerKey: ", innerKey);
    setIsExhibitVisible((prevState) => {
      // Clone the previous state
      const newState = { ...prevState };

      // Toggle the boolean value of the inner key
      newState[outerKey] = { ...newState[outerKey], [innerKey]: !newState[outerKey]?.[innerKey] };

      // Return the updated state
      return newState;
    });
  };

  return (
    <main className="h-max w-full p-2 pt-0">
      <DragDropContext onDragEnd={handleDragDrop}>
        <Droppable droppableId="ROOT" type="group">
          {(provided) => (
            <main className="w-full" {...provided.droppableProps} ref={provided.innerRef}>
              {sections &&
                sections.map((section, indexSection) => (
                  <Draggable draggableId={section.id} key={section.id} index={indexSection}>
                    {(provided) => (
                      <div
                        {...provided.dragHandleProps}
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                        className="border-x-2 border-border text-center"
                      >
                        <Droppable droppableId={section.id} type="section">
                          {(provided) => (
                            <div {...provided.droppableProps} ref={provided.innerRef} className="">
                              <section className="flex h-full w-full items-center justify-normal gap-6 border-b border-border bg-[#f6f6f7] p-3">
                                <GripVertical size={18} className="w-16" />
                                <button
                                  onClick={() => toggleSubSection(indexSection)}
                                  className="hover:selector"
                                >
                                  {isSubSectionVisible[indexSection] ? (
                                    <ChevronDown
                                      size={50}
                                      strokeWidth={1.5}
                                      className="h-full w-full opacity-60"
                                    />
                                  ) : (
                                    <ChevronRight
                                      size={50}
                                      strokeWidth={1.5}
                                      className="h-full w-full opacity-60"
                                    />
                                  )}
                                </button>
                                {/* <h1 className="text-base">Section-{index + 1}</h1> */}
                                <h2 className="text-nowrap rounded-md border border-border bg-white p-1 text-sm font-semibold">
                                  Section-{indexSection + 1}
                                </h2>
                                <p className="w-full cursor-pointer overflow-hidden overflow-ellipsis text-nowrap text-left text-[15px] font-medium ">
                                  {/* <ViewDialog
                                    dialogType={DialogType.Section}
                                    title={section.title}
                                    description={section.description}
                                    comments={section.comments}
                                  /> */}
                                  <EditDialog
                                    dialogType={DialogType.Section}
                                    id={section.id}
                                    title={section.title}
                                    description={section.description}
                                    comments={section.comments}
                                    refetchData={refetchData}
                                  />
                                </p>

                                <p className="m-0">
                                  {/* <AddSubSectionDialog userId={userId} sectionId={section.id} /> */}
                                  <AddDialog
                                    userId={userId}
                                    itemId={section.id}
                                    dialogType={DialogType.Subsection}
                                    refetchData={refetchData}
                                  />
                                </p>
                                {/* <p>{section.position}</p> */}
                                <i className="ml-auto mr-8 flex flex-row items-center justify-items-end gap-1 text-base">
                                  <MessageCircle size={16} />
                                  Comment
                                </i>
                              </section>
                              {/* Subsection Drag and Drop */}
                              <div
                                className={`${isSubSectionVisible[indexSection] ? "h-auto" : "hidden h-0"}`}
                              >
                                {section.SubSection.map((subsection, indexSubsection) => (
                                  <Draggable
                                    draggableId={subsection.id}
                                    key={subsection.id}
                                    index={indexSubsection}
                                  >
                                    {(provided) => (
                                      <div
                                        {...provided.dragHandleProps}
                                        {...provided.draggableProps}
                                        ref={provided.innerRef}
                                        className=""
                                      >
                                        <Droppable droppableId={subsection.id} type="subsection">
                                          {(provided) => (
                                            <div
                                              {...provided.droppableProps}
                                              ref={provided.innerRef}
                                              className="pl-12"
                                            >
                                              <section className="flex h-full w-full items-center justify-normal gap-6 border-b border-border bg-white p-3">
                                                <GripVertical size={18} className="w-16" />
                                                <button
                                                  onClick={() =>
                                                    toggleExhibit(indexSection, indexSubsection)
                                                  }
                                                  className="hover:selector"
                                                >
                                                  {isExhibitVisible[indexSection]?.[
                                                    indexSubsection
                                                  ] ? (
                                                    <ChevronDown
                                                      size={45}
                                                      className="h-full w-full opacity-60"
                                                    />
                                                  ) : (
                                                    <ChevronRight
                                                      size={45}
                                                      className="h-full w-full opacity-60"
                                                    />
                                                  )}
                                                </button>
                                                <h2 className="text-nowrap rounded-md border border-border bg-white p-1 text-sm font-semibold">
                                                  Sub-Section-{indexSubsection + 1}
                                                </h2>
                                                <p className="w-full cursor-pointer overflow-hidden overflow-ellipsis text-nowrap text-left text-[15px] font-medium ">
                                                  {/* <ViewDialog
                                                    dialogType={DialogType.Subsection}
                                                    title={subsection.title}
                                                    description={subsection.description}
                                                    comments={subsection.comments}
                                                  /> */}
                                                  <EditDialog
                                                    dialogType={DialogType.Subsection}
                                                    id={subsection.id}
                                                    title={subsection.title}
                                                    description={subsection.description}
                                                    comments={subsection.comments}
                                                    refetchData={refetchData}
                                                  />
                                                </p>
                                                <p className="m-0">
                                                  {/* <AddSubSectionDialog userId={userId} sectionId={subsection.id} /> */}
                                                  <AddDialog
                                                    userId={userId}
                                                    itemId={subsection.id}
                                                    dialogType={DialogType.Exhibit}
                                                    refetchData={refetchData}
                                                  />
                                                </p>
                                                <p>{subsection.id}</p>
                                                <i className="ml-auto mr-8 flex flex-row items-center justify-items-end gap-1 text-base">
                                                  <MessageCircle size={16} />
                                                  Comment
                                                </i>
                                              </section>
                                              {/* Exhibits Drag and Drop */}
                                              <div
                                                className={`${isExhibitVisible[indexSection]?.[indexSubsection] ? "h-auto" : "hidden h-0"}`}
                                              >
                                                {subsection.Exhibits.map((exhibit, index) => (
                                                  <Draggable
                                                    draggableId={exhibit.id}
                                                    key={exhibit.id}
                                                    index={index}
                                                  >
                                                    {(provided) => (
                                                      <div
                                                        {...provided.dragHandleProps}
                                                        {...provided.draggableProps}
                                                        ref={provided.innerRef}
                                                        className="pl-16"
                                                      >
                                                        <section className="flex h-full w-full items-center justify-normal gap-6 border-b border-border bg-white p-3">
                                                          <GripVertical
                                                            size={18}
                                                            className="w-16"
                                                          />
                                                          <h2 className="text-nowrap rounded-md border border-border bg-white p-1 text-sm font-semibold">
                                                            Exhibit-{index + 1}
                                                          </h2>
                                                          <p className="w-full cursor-pointer overflow-hidden overflow-ellipsis text-nowrap text-left text-[15px] font-medium ">
                                                            {/* <ViewDialog
                                                              dialogType={DialogType.Exhibit}
                                                              title={exhibit.title}
                                                              description={exhibit.description}
                                                              comments={exhibit.comments}
                                                            /> */}
                                                            <EditDialog
                                                              dialogType={DialogType.Exhibit}
                                                              id={exhibit.id}
                                                              title={exhibit.title}
                                                              description={exhibit.description}
                                                              comments={exhibit.comments}
                                                              refetchData={refetchData}
                                                            />
                                                          </p>
                                                          {/* <p>{exhibit.position}</p> */}
                                                          <i className="ml-auto mr-8 flex flex-row items-center justify-items-end gap-1 text-base">
                                                            <MessageCircle size={16} />
                                                            Comment
                                                          </i>
                                                        </section>
                                                      </div>
                                                    )}
                                                  </Draggable>
                                                ))}
                                              </div>
                                              {provided.placeholder}
                                            </div>
                                          )}
                                        </Droppable>
                                      </div>
                                    )}
                                  </Draggable>
                                ))}
                              </div>
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
      {updatedSectionsPosition || updatedSubSectionsPosition || updatedExhibitsPosition ? (
        <div className="flex w-full justify-end gap-8 rounded-b-md border border-t-0 px-4 py-2 ">
          <Button variant={"secondary"}>Cancel</Button>
          <Button variant={"primary"} onClick={updateSubSectionPostionInDb}>
            Save changes
          </Button>
        </div>
      ) : null}
    </main>
  );
};

export default DragNDropSection;
