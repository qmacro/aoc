(ns adventofcode.day14
  (:require [clojure.string :as str]))

(defn to-ints
  "Takes a list of keys and a map, and returns
  a new map where the values for the given keys
  are parsed as ints."
  [keys coll]
  (if (empty? keys)
    coll
    (let [k (first keys)]
      (recur
        (rest keys)
        (assoc coll k (Integer. (coll k)))
        ))))

(def race 2503)

(def facts
  "Work out the facts from the input. Given a line like this:
  'Rudolph can fly 22 km/s for 8 seconds, but then must rest for 165 seconds.'
  the fact data looks like this:
  {:flytime 8 :kms 22 :name 'Rudolph' :resttime 165}"
  (->> "resources/day14input"
       slurp
       str/split-lines
       (map (partial re-seq #"(?:^\w+|\d+)"))
       (map (partial zipmap [:name :kms :flytime :resttime]))
       (map (partial to-ints [:kms :flytime :resttime]))
       ))

(defn flying?
  "Returns whether the participant is flying or not at
  the specified second."
  [participant sec]
  (let [{:keys [flytime resttime]} participant
        totaltime (+ flytime resttime)
        remain (mod sec totaltime)]
    (and
      (not (zero? remain))
      (<= remain flytime))))

(defn travelled
  "Returns how far the participant has travelled in
  the given second."
  [participant sec]
  (if (flying? participant sec) (participant :kms) 0))

(defn furthest-indices
  [distances]
  (keep-indexed #(when (= %2 (apply max distances)) %1) distances))

(defn distance
  [race participant]
  (let [fly (participant :flytime)
        pause (participant :resttime)
        duration (+ fly pause)
        phases (quot race duration)
        left (mod race duration)]
    (*
     (+ (* phases fly) (min fly left))
     (participant :kms))))



(defn solve
  "..."
  [& args]
  (do

    ;; Part 1
    (println (apply max (map (partial distance race) facts)))

    ;; Part 2
    (def points
      (loop
        [n 1
         totals (take (count facts) (repeat 0))
         points []]
        (if (> n race)
          (frequencies (flatten points))
          (let [stepdistance (map #(travelled % n) facts)
                distances-travelled (map + totals stepdistance)]
            (recur
              (inc n)
              distances-travelled
              (conj points (furthest-indices distances-travelled)))))))
    (println (apply max (vals points)))


    ))
