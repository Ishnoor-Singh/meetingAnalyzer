from assess import read_frames, compute_score
scores = read_frames("./zoom_0.mp4")
timesteps = [i for i in range(0, len(scores))]
print(f"SCORES: \n{scores}\n")
print(f"TIMESTEPS: \n{timesteps}\n")
print(f"FINAL SCORE: \n{compute_score(scores)}\n")
