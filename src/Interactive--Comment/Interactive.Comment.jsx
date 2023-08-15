import { useState } from "react";
import totalData from "./../../public/data.json";
import { RenderHtml } from "../Constant";
import { v4 as uuidv4 } from "uuid";

const Interactive = () => {
  const [getdata, setTotalData] = useState(() => totaldataAddProperties());
  const [userReplyClick, setuserReply] = useState(null);

  function totaldataAddProperties() {
    const dataChange = {
      ...totalData,
      comments: totalData.comments?.map((comment) => {
        const { replies } = comment;
        return {
          ...comment,
          userClick: false,
          inputfiledClick: false,
          editBox: false,
          replies:
            replies.length === 0
              ? []
              : replies.map((reply) => {
                  return {
                    ...reply,
                    userClick: false,
                    inputfiledClick: false,
                    editBox: false,
                    replies: [],
                  };
                }),
        };
      }),
    };
    return dataChange;
  }

  function Textareafn({ event, username, id, image, name }) {
    const userWriteContext = event.target.value;

    const updateselecteddata = {
      replyId: id,
      content: userWriteContext,
      createdAt: new Date().toDateString(),
      score: 0,
      replyingTo: name,
      editBox: false,
      userClick: false,
      user: {
        image,
        username,
      },
    };
    setuserReply(updateselecteddata);
  }

  function addComment() {
    const userReply = {
      id: uuidv4(),
      ...userReplyClick,
    };

    const dataChangetotaldata = {
      ...getdata,
      comments: getdata.comments?.map((comment) => {
        if (comment?.id === userReplyClick.replyId) {
          return {
            ...comment,
            replies: [...comment.replies, userReply],
          };
        } else {
          const replyit = comment?.replies?.map((reply) => {
            return {
              ...reply,
              replies:
                reply.id === userReplyClick.replyId
                  ? [...reply.replies, userReply]
                  : reply.replies,
            };
          });
          if (comment?.replies.some((rep) => rep.inputfiledClick === true)) {
            return {
              ...comment,
              replies: replyit,
            };
          } else {
            return comment;
          }
        }
      }),
    };

    setTotalData(dataChangetotaldata);

    setuserReply((prev) => {
      return { ...prev, content: "@" + prev?.replyingTo };
    });
  }

  function clickReplytoPost(id) {
    const updatedData = {
      ...getdata,
      comments: getdata.comments.map((comment) => {
        if (comment.id === id) {
          return {
            ...comment,
            inputfiledClick: !comment.inputfiledClick,
          };
        } else {
          const updatedReplies = comment.replies.map((reply) => ({
            ...reply,
            inputfiledClick:
              reply?.id === id ? !reply.inputfiledClick : reply.inputfiledClick,
          }));

          if (comment?.replies?.some((reply) => reply.id === id)) {
            return {
              ...comment,
              replies: updatedReplies,
            };
          } else {
            return comment;
          }
        }
      }),
    };
    setTotalData(updatedData);
  }

  function handlerbtnClickpostivie(id, position) {
    const updatedata = {
      ...getdata,
      comments: getdata?.comments?.map((comment) => {
        if (comment.id === id) {
          return {
            ...comment,
            userClick: position === "positive" ? true : false,
            score:
              comment.userClick === false ? comment.score + 1 : comment.score,
          };
        } else if (comment?.replies?.some((checkrep) => checkrep.id === id)) {
          const commentreply = comment?.replies?.map((reply) => {
            return {
              ...reply,
              userClick: position === "positive" ? true : false,
              score: reply.userClick === false ? reply.score + 1 : reply.score,
            };
          });

          return {
            ...comment,
            replies: commentreply,
          };
        } else {
          const replyrepliescheckher = comment?.replies
            ?.map((reply) => {
              return reply?.replies?.some((replirep) => replirep?.id === id);
            })
            .some((rep) => rep === true);
          if (replyrepliescheckher) {
            const replyreplies = comment?.replies?.map((reply) => {
              return {
                ...reply,
                replies: reply?.replies?.map((repitem) => {
                  return {
                    ...repitem,
                    userClick: position === "positive" ? true : false,
                    score:
                      repitem?.userClick === false
                        ? repitem?.score + 1
                        : repitem?.score,
                  };
                }),
              };
            });
            return {
              ...comment,
              replies: replyreplies,
            };
          } else {
            return comment;
          }
        }
      }),
    };
    setTotalData(updatedata);
  }

  function handlerbtnClickNegative(id, position) {
    const updatedata = {
      ...getdata,
      comments: getdata?.comments?.map((comment) => {
        if (comment.id === id) {
          return {
            ...comment,
            score:
              comment.userClick === true ? comment.score - 1 : comment.score,

            userClick: position === "negative" ? false : comment?.userClick,
          };
        } else if (comment?.replies?.some((checkrep) => checkrep.id === id)) {
          const commentreply = comment?.replies?.map((reply) => {
            return {
              ...reply,
              score: reply.userClick === true ? reply.score - 1 : reply.score,

              userClick: position === "negative" ? false : reply?.userClick,
            };
          });

          return {
            ...comment,
            replies: commentreply,
          };
        } else {
          const replyrepliescheckher = comment?.replies
            ?.map((reply) => {
              return reply?.replies?.some((replirep) => replirep?.id === id);
            })
            .some((rep) => rep === true);
          if (replyrepliescheckher) {
            const replyreplies = comment?.replies?.map((reply) => {
              return {
                ...reply,
                replies: reply?.replies?.map((repitem) => {
                  return {
                    ...repitem,
                    score:
                      repitem.userClick === true
                        ? repitem.score - 1
                        : repitem.score,
                    userClick:
                      position === "negative" ? false : repitem?.userClick,
                  };
                }),
              };
            });
            return {
              ...comment,
              replies: replyreplies,
            };
          } else {
            return comment;
          }
        }
      }),
    };
    setTotalData(updatedata);
  }

  function deleteReply(userDeleteId) {
    const updatedata = {
      ...getdata,
      comments: getdata.comments.map((comment) => {
        return {
          ...comment,
          replies: comment?.replies
            ?.map((reply) => {
              if (reply.id === userDeleteId) {
                return null;
              } else {
                const checkreplyies = reply?.replies?.filter((repl) => {
                  return repl.id !== userDeleteId;
                });
                if (reply?.replies?.some((repl) => repl.id === userDeleteId)) {
                  return {
                    ...reply,
                    replies: checkreplyies,
                  };
                } else {
                  return reply;
                }
              }
            })
            .filter((Reply) => Reply !== null),
        };
      }),
    };
    setTotalData(updatedata);
  }

  function onEditChange(editId) {
    const gettotaldata = {
      ...getdata,
      comments: getdata.comments.map((comment) => {
        return {
          ...comment,
          replies: comment.replies.map((reply) => {
            if (reply.id === editId) {
              return {
                ...reply,
                editBox: !reply.editBox,
              };
            } else {
              const replyreplies = reply?.replies?.map((repli) => {
                return {
                  ...repli,
                  editBox: repli.id === editId ? !repli.editBox : repli.editBox,
                };
              });

              if (reply?.replies?.some((rep) => rep.id === editId)) {
                return {
                  ...reply,
                  replies: replyreplies,
                };
              } else {
                return reply;
              }
            }
          }),
        };
      }),
    };

    setTotalData(gettotaldata);
  }

  function updatEditChange({ id, text }) {
    const updatedata = {
      ...getdata,
      comments: getdata.comments?.map((comment) => {
        return {
          ...comment,
          replies: comment?.replies?.map((reply) => {
            if (reply.id === id) {
              return {
                ...reply,
                editBox: false,
                content: text,
                createdAt: new Date().toDateString(),
              };
            } else {
              const replyreplies = reply?.replies?.map((repli) => {
                return {
                  ...repli,
                  editBox: repli.id === id ? false : repli.editBox,
                  content: repli.id === id ? text : repli.content,
                  createdAt:
                    repli.id === id
                      ? new Date().toDateString()
                      : repli.createdAt,
                };
              });
              if (reply?.replies?.some((reply) => reply.id === id)) {
                return {
                  ...reply,
                  replies: replyreplies,
                };
              } else {
                return reply;
              }
            }
          }),
        };
      }),
    };

    setTotalData(updatedata);
  }

  const getDataRenderHtml = Object.entries(getdata).map(([key, value]) => {
    const { image, username } = getdata["currentUser"];

    return (
      key === "comments" &&
      value.map((item) => {
        const { replies, inputfiledClick } = item;

        const repleyhtml = replies?.map((reply) => {
          return (
            <div key={reply?.id}>
              <RenderHtml
                item={reply}
                updatEditChange={updatEditChange}
                currentuser={username}
                onClick={clickReplytoPost}
                handlerDeleteClick={() => deleteReply(reply?.id)}
                onEditChange={() => onEditChange(reply?.id)}
                handlerbtnClickpostivie={handlerbtnClickpostivie}
                handlerbtnClickNegative={handlerbtnClickNegative}
              />
              {reply?.replies &&
                reply.replies.map((replies, i) => {
                  return (
                    <div key={i} className="margin--left">
                      <RenderHtml
                        item={replies}
                        currentuser={username}
                        updatEditChange={updatEditChange}
                        handlerDeleteClick={() => deleteReply(replies?.id)}
                        onEditChange={() => onEditChange(replies?.id)}
                        handlerbtnClickpostivie={handlerbtnClickpostivie}
                        handlerbtnClickNegative={handlerbtnClickNegative}
                      />
                    </div>
                  );
                })}
              {reply?.inputfiledClick && (
                <div className="add-comment">
                  <div className="profile-pic">
                    <img src={image?.png} />
                  </div>

                  <textarea
                    className="comment-input"
                    placeholder="Add a comment"
                    value={
                      reply?.id === userReplyClick?.replyId
                        ? userReplyClick?.content
                        : "@" + reply?.user?.username
                    }
                    onChange={(event) =>
                      Textareafn({
                        event,
                        image,
                        username,
                        id: reply.id,
                        name: reply.user.username,
                      })
                    }
                  />
                  <div className="send-btn-container">
                    <div className="profile-pic"></div>
                    <button className="add-btn" onClick={addComment}>
                      reply
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        });

        return (
          <div key={item?.id} className="comment-container ">
            <RenderHtml
              item={item}
              onClick={clickReplytoPost}
              currentuser={username}
              handlerbtnClickpostivie={handlerbtnClickpostivie}
              handlerbtnClickNegative={handlerbtnClickNegative}
              
            />
            <div className="reply-container">{repleyhtml}</div>

            {inputfiledClick && (
              <div className="add-comment">
                <div className="profile-pic">
                  <img src={image?.png} />
                </div>

                <textarea
                  className="comment-input"
                  placeholder="Add a comment"
                  value={
                    item?.id === userReplyClick?.replyId
                      ? userReplyClick?.content
                      : "@" + item?.user?.username
                  }
                  onChange={(event) =>
                    Textareafn({
                      event,
                      image,
                      username,
                      id: item.id,
                      name: item.user.username,
                    })
                  }
                />
                <div className="send-btn-container">
                  <div className="profile-pic"></div>
                  <button className="add-btn" onClick={addComment}>
                    reply
                  </button>
                </div>
              </div>
            )}
          </div>
        );
      })
    );
  });

  return <div className="App">{getDataRenderHtml}</div>;
};

export default Interactive;
