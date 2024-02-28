import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Code,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ScrollShadow, useDisclosure
} from "@nextui-org/react";
import {Maximize2, MoreVertical, Plus, Zap} from "react-feather";
import {Current} from "../models/Current.ts";
import {uid} from "uid";
import {AnimatePresence, motion} from "framer-motion";
import {useState} from "react";

export interface ActionsSectionProps {
    currents: Current[],
    updateCurrentByIndex: (index: number, current: Current) => void,
    addCurrent: (current: Current) => void,
    deleteCurrent: (id: string) => void,
}

export default function ActionsSection(props: ActionsSectionProps) {

    const currentCards = props.currents.map((current, index) => {
        return <CurrentCard
            key={current.id}
            current={current}
            updateCurrent={(current: Current) => props.updateCurrentByIndex(index, current)}
            deleteCurrent={() => props.deleteCurrent(current.id)}/>
    });

    const generateRandomColor = (): string => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * letters.length)];
        }
        return color;
    }

    return (
        <div style={{gridTemplateRows: "auto 1fr", height: "calc(100vh - 40px)"}} className={"grid m-5 mr-0 gap-5"}>
            <Card>
                <CardHeader>
                    <h2 className={"text-2xl"}>Actions</h2>
                </CardHeader>
                <CardBody>
                    <Button
                        onPress={() => {
                            props.addCurrent({
                                id: uid(),
                                x: 100,
                                y: 100,
                                currentValue: 10,
                                color: generateRandomColor(),
                                radius: 20
                            })
                        }}
                        startContent={<Plus size={18}/>}
                        color={"primary"}
                        size={"lg"}>Add current</Button>
                </CardBody>
            </Card>
            <Card className={"h-full"}>
                <CardHeader>
                    <h2 className={"text-2xl"}>Currents</h2>
                </CardHeader>
                <CardBody>
                    <ScrollShadow hideScrollBar className={"p-4 h-full"}>
                        <div className={"flex flex-col gap-2"}>
                            <AnimatePresence mode={"popLayout"}>
                                {currentCards.length > 0 ?
                                    currentCards :
                                    <motion.div
                                        key={"empty"}
                                        initial={{scale: 0.5, opacity: 0}}
                                        animate={{scale: 1, opacity: 1}}
                                        exit={{scale: 0.5, opacity: 0}}
                                        transition={{type: "easeInOut", duration: 0.2}}
                                        className={"flex flex-col items-center m-auto gap-3"}
                                        layout>
                                        <p>No currents yet</p>
                                        <Button
                                            className={"bg-background-200"}
                                            onPress={() => {
                                                props.addCurrent({
                                                    id: uid(),
                                                    x: 100,
                                                    y: 100,
                                                    currentValue: 10,
                                                    color: generateRandomColor(),
                                                    radius: 20
                                                })
                                            }}
                                            startContent={<Plus size={18}/>}
                                            color={"default"}
                                            variant={"flat"}
                                            size={"lg"}>Add current</Button>
                                    </motion.div>
                                }
                            </AnimatePresence>
                        </div>
                    </ScrollShadow>
                </CardBody>
            </Card>
        </div>
    )
}

export function CurrentCard(props: {
    current: Current,
    updateCurrent: (current: Current) => void,
    deleteCurrent: () => void,
}) {

    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    const [newCurrentValue, setNewCurrentValue] = useState<string>(props.current.currentValue.toString());
    const [newCurrentValueError, setNewCurrentValueError] = useState<string | null>(null);

    const [newRadiusValue, setNewRadiusValue] = useState<string>(props.current.radius.toString());
    const [newRadiusValueError, setNewRadiusValueError] = useState<string | null>(null);

    return (
        <motion.div
            initial={{scale: 0.5, opacity: 0}}
            animate={{scale: 1, opacity: 1}}
            exit={{scale: 0.5, opacity: 0}}
            transition={{type: "easeInOut", duration: 0.2}}
            layout>
            <Card>
                <CardBody>
                    <div style={{gridTemplateColumns: "auto 1fr auto"}} className={"grid items-center gap-3"}>
                        <span className={"w-2 h-full"} style={{background: props.current.color, borderRadius: 10}}>

                        </span>
                        <div className={"flex flex-col gap-1"}>
                            <div className={"flex gap-2"}>
                                {/*<Move className="w-4 text-accent pointer-events-none flex-shrink-0"/>*/}
                                <p>Position:</p>
                                <Code className={"ml-auto"}
                                      color={"primary"}>{Math.floor(props.current.x)}:{Math.floor(props.current.y)}</Code>
                            </div>
                            <div className={"flex gap-2"}>
                                {/*<Zap className="w-4 text-accent pointer-events-none flex-shrink-0"/>*/}
                                <p>Value: </p>
                                <Code className={"ml-auto"} color={"primary"}>{props.current.currentValue}A</Code>
                            </div>
                            <div className={"flex gap-2"}>
                                {/*<Maximize2 className="w-4 text-accent pointer-events-none flex-shrink-0"/>*/}
                                <p>Radius: </p>
                                <Code className={"ml-auto"} color={"primary"}>{props.current.radius}m</Code>
                            </div>

                        </div>
                        <Dropdown>
                            <DropdownTrigger>
                                <Button
                                    className={"ml-auto"}
                                    isIconOnly
                                    variant="solid"
                                    startContent={<MoreVertical size={24}/>}
                                >
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu className={"bg-content1"} aria-label="Static Actions">
                                <DropdownItem onPress={onOpen} color={"primary"} key="new">Edit
                                    current</DropdownItem>
                                <DropdownItem color={"primary"} key="new">Duplicate current</DropdownItem>
                                <DropdownItem
                                    onPress={() => props.deleteCurrent()}
                                    key="delete"
                                    className="text-danger"
                                    color="danger">
                                    Delete current
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                </CardBody>
            </Card>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                backdrop={"blur"}
                placement="top-center"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                Edit current
                                <span
                                    className={"w-[100px] h-2"}
                                    style={{background: props.current.color, borderRadius: 10}}/>
                            </ModalHeader>
                            <ModalBody>
                                <Input
                                    value={newCurrentValue}
                                    onValueChange={setNewCurrentValue}
                                    errorMessage={newCurrentValueError ? <p>{newCurrentValueError}</p> : null}
                                    type={"number"}
                                    autoFocus
                                    startContent={
                                        <Zap className="text-2xl text-default-400 pointer-events-none flex-shrink-0"/>
                                    }
                                    endContent={
                                        <span className={"text-foreground-100"}>Amperes</span>
                                    }
                                    placeholder="New Current Value"
                                    variant="flat"
                                />
                                <Input
                                    value={newRadiusValue}
                                    onValueChange={setNewRadiusValue}
                                    errorMessage={newRadiusValueError ? <p>{newRadiusValueError}</p> : null}
                                    autoFocus
                                    startContent={
                                        <Maximize2 className="text-2xl text-default-400 pointer-events-none flex-shrink-0"/>
                                    }
                                    endContent={
                                        <span className={"text-foreground-100"}>Meters</span>
                                    }
                                    placeholder="New Radius Value"
                                    variant="flat"
                                />
                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary" onPress={() => {
                                    try {
                                        if (Number.parseFloat(newRadiusValue) <= 0) {
                                            setNewRadiusValueError("Radius must be more than 0");
                                            return;
                                        }
                                    } catch (error) {
                                        setNewRadiusValueError("Format error");
                                        return;
                                    }

                                    try {
                                        Number.parseFloat(newCurrentValue);
                                    } catch (error) {
                                        setNewCurrentValueError("Format error");
                                        return;
                                    }

                                    setNewRadiusValueError(null);
                                    setNewCurrentValueError(null);
                                    props.updateCurrent({...props.current, radius: Number.parseFloat(newRadiusValue), currentValue: Number.parseFloat(newCurrentValue)});
                                    onClose();
                                }}>
                                    Save
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </motion.div>
    )
}