import { blue, grey } from "@mui/material/colors";

export const styles = {
  container: {
    maxWidth: "small",
  },
  box: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 2,
  },
  channelBox: {
    display: "flex",
    alignItems: "center",
    marginBottom: 2,
  },
  channelAvatar: {
    backgroundColor: blue[500],
    marginRight: 2,
  },
  divider: {
    width: "100%",
    marginBottom: 2,
  },
  list: {
    width: "100%",
    borderRadius: "8px",
    padding: 0,
  },
  messageBox: {
    marginBottom: 2,
    backgroundColor: grey[100],
    paddingBottom: 2,
  },
  replyBox: {
    paddingHorizontal: 2,
    marginLeft: 8,
    marginTop: 1,
  },
  replyBar: {
    marginLeft: 6,
    marginTop: 1,
  },
  replyButtonBox: {
    display: "flex",
    marginLeft: 6,
    alignItems: "center",
  },
  newChatButton: {
    marginBottom: 2,
    display: "flex",
    justifyContent: "center",
  },
  messageBar: {
    display: "flex",
    alignItems: "center",
    marginBottom: 2,
  },
  nameAvatar: {
    backgroundColor: blue[500],
  },
  messageListItem: {
    alignItems: "center",
  },
  primaryText: {
    fontSize: 12,
  },
};
